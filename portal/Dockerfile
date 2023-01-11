FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN rm -f package-lock.json
RUN npm i

CMD npm run dev
