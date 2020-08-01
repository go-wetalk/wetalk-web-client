FROM node:12.10-alpine as rushb

WORKDIR /app

COPY . /app

RUN rm -f /app/.env.local

RUN yarn && yarn lint && yarn build

#####################################

FROM nginx:1.17-alpine

COPY --from=rushb /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD nginx -g "daemon off;"