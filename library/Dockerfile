FROM node:18.12
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY index.js ./
COPY src src/
COPY public public/
CMD ["npm", "run", "dev"]