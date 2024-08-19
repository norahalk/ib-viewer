FROM node:16
EXPOSE 3000
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY public ./public

RUN npm install

CMD ["npm", "start"]
