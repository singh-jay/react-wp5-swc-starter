FROM node:16.15.0-buster-slim as base
LABEL org.opencontainers.image.authors=jaysingh4797@gmail.com
LABEL org.opencontainers.image.title="SWC-WP5"
LABEL org.opencontainers.image.licenses=MIT
LABEL com.swcwp5.nodeversion=$NODE_VERSION
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000
WORKDIR /node
COPY package*.json ./
RUN npm config list
RUN npm ci && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
# RUN apt-get update -qq && apt-get install -qy \ 
#     ca-certificates \
#     bzip2 \
#     curl \
#     libfontconfig \
#     --no-install-recommends
RUN npm config list
RUN npm install --only=development && npm cache clean --force
WORKDIR /node/app
USER node

FROM dev as test
COPY . .
RUN npm audit
ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
USER root
RUN chmod +x /microscanner
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

FROM base as pre-prod
ENV NODE_ENV=development
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node
RUN npm config list
RUN npm ci && npm cache clean --force
WORKDIR /node/app
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine as prod
EXPOSE 3000
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=pre-prod /node/app/build /usr/share/nginx/html
# HEALTHCHECK CMD curl http://127.0.0.1/ || exit 1
CMD ["nginx", "-g", "daemon off;"]