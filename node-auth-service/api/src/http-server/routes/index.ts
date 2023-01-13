import express from 'express'
import { redisClient } from '../../utils/redis';
import User from '../models/user'

const childProcessExec = require('child_process').exec;
const util = require('util');
const exec = util.promisify(childProcessExec);

const router = express.Router()

let count = 0

router.get('/', async (req, res) => {
    const client = redisClient()
    const rcount = await client.get('count') || 0
    await client.set('count', Number(rcount)+1)

    console.log('*** count', count)
    return res.send(`
    <h3>API</h3>
    <h4>server count:${count++}</h4>
    <h4>redis count :${rcount}</h4>
    `).end()
})

router.get('/server-update', async (req, res) => {
    console.log('Executing server update...')
    await exec('git pull')
    console.log('Executed server update.')
    res.json({
        message: 'ok'
    })
})

router.post('/signup', (req, res) => {
    console.log('form: ', req.body)
    try {
        const user = User.createUser(req.body)
        res.status(201).json({
            message: 'Sign up success',
            data: user
        })
    } catch (e) {
        const { message } = e as any
        console.log('error', message)
        res.status(422).json({ message })
    }
})

router.post('/signin', (req, res) => {
    console.log('form: ', req.body)
    try {
        const user = User.getByCredential(req.body)
        if (user) {
            user.newToken
            res.json({ message: 'Login success', data: user })
        }
        else res.status(403).json({ message: 'Credential does not match' })
    } catch (e) {
        const { message } = e as any
        console.log('error', message)
        res.status(422).json({ message })
    }
})

router.post('/signout', (req, res) => {
    const user = User.getByToken(req.headers.authorization?.replace('Bearer ', '') || '')
    if(user) {
        user.clearToken
        res.status(200).json({ message: 'Signout success' })
    }
    else
        res.status(403).json({ message: 'Your are not sign in yet' })
})

router.get('/users', (req, res) => {
    res.json(User.getUsers())
})

router.post('/data', (req, res) => {
    res.status(404).json({ message: 'Not found' })
})

export default router;
