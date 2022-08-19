FROM node:current-alpine

LABEL author="Srivasthava Nunna"

ENV NODE_ENV=production
ENV PORT=4000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]