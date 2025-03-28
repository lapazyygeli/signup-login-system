ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}

WORKDIR /signup-login-system/backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

EXPOSE 5000
