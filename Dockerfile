FROM node:13-slim
LABEL Name="dko-app" Version=1.0.0
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install webpack -g
RUN npm rebuild node-sass
EXPOSE 1993
CMD npm run start
