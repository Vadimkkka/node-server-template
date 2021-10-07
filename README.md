## 🪲 Node server template

![JavaScript](https://img.shields.io/badge/-JavaScript-24292F?style=for-the-badge&logo=JavaScript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/-Node.js-24292F?style=for-the-badge&logo=Node.js&logoColor=339933)
![Express](https://img.shields.io/badge/-Express-24292F?style=for-the-badge&logo=Express)
![Jest](https://img.shields.io/badge/-Jest-24292F?style=for-the-badge&logo=Jest&logoColor=C21325)
![Swagger](https://img.shields.io/badge/-Swagger-24292F?style=for-the-badge&logo=Swagger&logoColor=85EA2D)

Простой сервер на ```Express``` с тестами на ```Jest``` 👋

<img src="./docs/Preview.png" alt="Preview" />

Для примера реализован тестовый маршрут по адресу ```localhost/api/v1/test/item``` с уже готовой тестовой средой.
Документация находиться по маршруту ```localhost/docs```.

Файл ```/docs/test-api.paw``` необходим для удобства разработки через приложение ```🦊 Paw```

### 🛠 Конфигурация

```conf
// .env
MODE=dev
PORT=3000
```
При ```dev``` моде - логирование ведётся в консоль, для ```prod``` в файл ```/logs/test.log``` по умолчанию.

Модуль логирования находится в ```/logs/logger.js```, в нем можно настроить вывод за основу взят  ```morgan```

### 🚀 Запуск сервера

```console
$ npm run dev
```
### 🧑‍💻 Запуск тестов

При запуске тестов автоматически задается ```MODE=test```

```console
$ npm run test-dev
$ npm run test
```

### 📜 Запуск авто-генерации документации API

```console
$ npm run docs
```
<img src="./docs/Preview-docs.png" alt="Preview docs" />

### 🏋️‍♂️ TODO

- [ ] 💅 Преобразить ```/public/index.html```
- [ ] 💪 Добавить ```express-cluster``` + pm2
- [ ] 🗃 Добавить работу с бд через ```prisma``` и ```mongodb```
