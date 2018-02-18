FROM node:carbon
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 3000
