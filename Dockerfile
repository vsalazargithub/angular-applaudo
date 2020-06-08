FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install --global http-server
COPY . .

RUN npm build --prod

FROM nginx:1.14.0

COPY dist/angular-applaudo /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


