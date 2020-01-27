# # build environment
# FROM node:12.2.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@3.0.1 -g --silent
# COPY . /app
# RUN npm run build

# # production environment
# FROM nginx:1.16.0-alpine
# COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:slim
LABEL Name="dko-app" Version=1.0.0
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install webpack -g
CMD npm run start:docker
