FROM node:7-alpine

COPY . /app

WORKDIR /app

RUN npm --registry https://registry.npm.taobao.org install && npm --registry https://registry.npm.taobao.org install gulp -g && gulp build 

EXPOSE 80/tcp

CMD node app.js