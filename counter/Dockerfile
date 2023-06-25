FROM node:18.12
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY . .
#можно переключить на start и не будет работать nodemone  при записи файла  -  оставлено для демонстрации точо что при перезагрузке севрера и контейнера все рабоатет
CMD ["npm", "run", "dev"]