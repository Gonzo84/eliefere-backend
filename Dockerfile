FROM node:12.13-alpine As development

ENV NODE_ENV=development

WORKDIR /usr/src/app

# see https://devcenter.heroku.com/articles/exec#enabling-docker-support
RUN apk add --no-cache curl bash openssh python
ADD ./.profile.d /app/.profile.d
RUN chmod a+x /app/.profile.d/heroku-exec.sh
RUN rm /bin/sh && ln -s /bin/bash /bin/sh


ADD ./ /bin/sh-wrapper.sh
RUN chmod a+x /bin/sh-wrapper.sh
RUN rm /bin/sh && ln -s /bin/sh-wrapper.sh /bin/sh

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
