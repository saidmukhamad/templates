FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]