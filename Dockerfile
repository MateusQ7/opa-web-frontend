FROM node:18-alpine
ARG NODE_ENV=development

ENV NODE_ENV=${NODE_ENV}

ARG TZ='America/Sao_Paulo'

ENV TZ ${TZ}

RUN apk upgrade --update \
    && apk add --no-cache bash curl make \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && apk add chromium \
    && rm -rf \
    /var/cache/apk/*

ENV CHROME_BIN='/usr/bin/chromium-browser'

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm i -g @angular/cli@15.2.6

USER node

WORKDIR /home/node/app

COPY . .

CMD ["node", "dist/main.js"]
