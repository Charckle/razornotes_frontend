FROM node:20.3.0-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
#RUN npm install --no-progress --legacy-peer-deps --force

COPY . .
RUN npm run build --prod

FROM nginx:1.21.0-alpine

COPY --from=build /app/dist/demo /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]