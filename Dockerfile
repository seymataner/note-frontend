FROM node:12.18-alpine
WORKDIR /usr/src/web
RUN npm install -g @quasar/cli
COPY package.json ./
RUN npm install 
COPY . .
EXPOSE 8080
ENTRYPOINT quasar dev

