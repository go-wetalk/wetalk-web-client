FROM node:14.7-alpine3.12 as rushb

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn

COPY . /app

RUN rm -f /app/.env.local

RUN yarn lint && yarn build

#####################################

FROM nginx:1.19-alpine

RUN sed -i '10s/.*/        try_files \$uri \$uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf # fix vue-router history mode.

COPY --from=rushb /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD nginx -g "daemon off;"