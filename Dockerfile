FROM node:10.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
EXPOSE 8080

COPY package.json yarn.lock /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

CMD [ "npm", "start" ]
