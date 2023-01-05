FROM node:14.20 as build

WORKDIR /app

RUN apt-get update

RUN apt-get install -y gyp python3 git curl ssh g++ make

COPY . .

RUN npm install -g npm
RUN npm install

RUN yarn build

FROM nginx:1.23-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/shared/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]