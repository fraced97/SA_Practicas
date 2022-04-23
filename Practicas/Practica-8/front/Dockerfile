FROM node:14 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/local/app/build .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80