# gimme-a-hug-server
This is a simple server for Gimme a Hug Android app. The goal of this project is to offer a RESTful API for the app as well as a server to handle Android push notifications.

## Start the server
The next commands must be used to start the server in production mode:
```
$ export NODE_ENV=production
$ node server.js
```

Alternatively, as the server use [bunyan](https://github.com/trentm/node-bunyan), the next command can be used to get a readable log output:
```
node server.js | <path_to_node_modules>/bunyan/bin/bunyan
```

## REST API
The next table is a showcase of all API endpoints. For more information about method's payload check model schemas.

| HTTP verbs    | Resource name | HTTP method                   |
| ------------- | ------------- | ----------------------------- |
| create        | User          | POST /users with Payload      |
| delete        | User          | DELETE /users/david           |
| list          | User          | GET /users                    |
| update        | User          | PUT /users/david with Payload |
| view          | User          | GET /users/david              |
