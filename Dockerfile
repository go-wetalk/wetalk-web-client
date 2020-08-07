FROM node:14.7-alpine3.12 as rushb

WORKDIR /app

COPY . /app

RUN rm -f /app/.env.local

ENV NODE_ENV=production

RUN yarn && yarn lint && yarn build

#####################################

FROM nginx:1.19-alpine

COPY --from=rushb /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD nginx -g "daemon off;"