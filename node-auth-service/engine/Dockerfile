FROM node:alpine

EXPOSE 8082

WORKDIR /usr/app
COPY ./ /usr/app

RUN rm -f package-lock.json
RUN npm i

CMD npm run dev
