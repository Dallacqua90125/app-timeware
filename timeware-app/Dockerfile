# Etapa de build
FROM node:18  AS angular
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# Etapa de deploy
FROM httpd:2.4

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /usr/src/app/dist/timeware-app/ .
