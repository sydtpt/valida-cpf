# We label our stage as ‘builder’
FROM node:10-alpine as front

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /front && mv ./node_modules ./front

WORKDIR /front

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Setup ###

FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From front stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=front /front/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]