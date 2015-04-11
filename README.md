# gimme-a-hug-server
RESTful API for Gimme a Hug Android app

## Start the server
```
$ export NODE_ENV=production
$ node server.js
```

## REST API
| HTTP verbs    | Resource name | HTTP method                   |
| ------------- | ------------- | ----------------------------- |
| create        | User          | POST /users with Payload      |
| delete        | User          | DELETE /users/david           |
| list          | User          | GET /users                    |
| update        | User          | PUT /users/david with Payload |
| view          | User          | GET /users/david              |
