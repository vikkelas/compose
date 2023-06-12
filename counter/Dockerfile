FROM node:18.12
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY index.js ./
COPY BookStore.js ./
COPY data data/
VOLUME %cd%:/data:/data
CMD ["npm", "run", "dev"]