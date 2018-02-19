FROM node:carbon
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
RUN npm install express
COPY . .
EXPOSE 3000
