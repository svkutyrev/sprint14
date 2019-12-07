https://svkutyrev.github.io/sprint14/ v1.1 releases 1

Реализован функционал REST API для проекта Mesto, для запуска необходимо:

клонируйте репозиторий из ветки develop установите node modules устновите базу данных Mongoos установить POSTMAN

При запросах:

POST/signup - создается пользователь, для отправки обязательные поля: name, about, avatar, email, password
POST/signin - авторизация пользователя, для авторизации необходимо ввести email, password

GET /users - выводится JSON список пользователей 
GET /users/id - выводится JSON объек конктретного юзера, если юзер не найден выводится ошибка 
GET /cards - выводится JSON список всех карточек 
POST /cards - создается карточка, для отправки обязательные поля: name, link
DELETE/cards/:cardId - удаление собственных карточек, пользователь не может удалить чужую карточку. 

При неверных запросах выводится код ошибки и статус - 404
При неправильной авторизации выводится ошибка и статус - 401
