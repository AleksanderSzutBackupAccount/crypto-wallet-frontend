FROM node:14.20

WORKDIR /app

RUN apt-get update

RUN apt-get install -y gyp python3 git curl ssh g++ make

COPY . .

RUN npm install -g npm
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start"]