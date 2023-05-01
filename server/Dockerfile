FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80

ENV MONGODB_USERNAME=gokul
ENV MONGODB_PASSWORD=secret
ENV MONGODB_URI=mongodb
ENV PORT=80
ENV NODE_ENV=development

CMD [ "npm","start" ]
