## Vacancies-Suggestions Back-end part of application
Back-end: send POST https://vacancies-suggestions-219018.appspot.com/getBestVacancies   (deployed using Google Cloud App Engine)

Front-end: https://vacancies-219107.appspot.com/

It is a client-server web application that suggests the optimal vacancies for Test Engineers based on the skills provided in search. 

Used Information Retrieval  –  parsing information from jobs website.

Used Data Mining – finding the patterns of how the information is structured.

**Technologies used:**

Node.JS, Express, MongoDB, Mongoose, ESlint, Prettier, Cron, Babel, Nodemon.

**To install dependencies:**
```
$npm install
```

**To run server:**
```
$mongod
$npm run build
$npm run start-prod
```

Server will listen on localhost:8080 for requests from web application.
