import { randomUUID } from "crypto"

const user_index = new Set
let user_count = 0

export default class User {

    private static users: User[] = []

    public id: number
    public phone: string
    public token: string | undefined
    public password: string

    
    constructor(phone: string, password: string) {
        if(phone === undefined || password === undefined) throw Error('phone and password are required')
        if(phone === null || password === null) throw Error('phone and password are required')
        
        const index = `${phone}${password}`
        if(user_index.has(index)) throw Error('user credential must be unique')
        
        user_index.add(index)
        this.phone = phone
        this.password = password
        this.token = this.newToken
        this.id = user_count++
        User.users.push(this)
    }

    public get newToken() {
        this.token = randomUUID()
        return this.token
    }

    public set newToken(token: string) {
        this.token = token
    }

    public get clearToken() {
        this.token = undefined
        return
    }

    public static getUsers() {
        return User.users
    }

    public static createUser(credential: { phone: string; password: string }) {
        return new User(credential.phone, credential.password)
    }

    static getByCredential(credential: { phone: string; password: string }) {
        return this.users.find((u:User) => u.phone === credential.phone && u.password === credential.password)
    }

    static getByToken(token: string) {
        return this.users.find(u => u.token === token)
    }
}