FROM node:15.5-alpine

RUN addgroup -g 997 -S app \
&& adduser -G app -u 998 -D -S app

RUN apk --no-cache add --virtual builds-deps build-base python

ENV HOME=/home/app

RUN mkdir -p $HOME
RUN chown -R app:app $HOME

WORKDIR $HOME/

COPY package.json $HOME/
COPY package-lock.json $HOME/

RUN npm install

COPY ./ $HOME/