FROM node:10.6

# Add node-gyp for bcrypt build support
# RUN yarn global add node-gyp

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Setup the environment
ENV NODE_ENV production
# ENV PATH /usr/src/app/bin:$PATH
# ENV TALK_PORT 8080
EXPOSE 8080

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
# RUN yarn install --production
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]
