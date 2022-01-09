FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

COPY . .

RUN npx prisma generate
RUN npm run docs
EXPOSE 3000

ENTRYPOINT ["sh", "docker/entrypoint.sh"]

CMD [ "npm", "run", "start" ]
