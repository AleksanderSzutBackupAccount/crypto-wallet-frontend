FROM node:14.20-bullseye-slim

ENV NODE_ENV development
ENV PORT 80

WORKDIR /app

RUN apt-get update

RUN apt-get install -y gyp python3 git curl ssh g++ make

COPY . .

RUN npm install -g npm

RUN npm ci

CMD [ "npm", "run", "start"]