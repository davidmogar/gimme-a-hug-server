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

| HTTP verbs    | Resource name | HTTP method                                                          |
| ------------- | ------------- | -------------------------------------------------------------------- |
| create        | Comment       | POST /comments with Payload                                          |
| delete        | Comment       | DELETE /comments/5529c97e9fd48bdd4c0ad93d                            |
| view          | Comment       | GET /comments/5529c97e9fd48bdd4c0ad93d                               |
| count         | Hug           | GET /users/5529c97e9fd48bdd4c0ad93d/hugs                             |
| create        | Hug           | POST /hugs with Payload                                              |
| list          | Hug           | GET /hugs                                                            |
| create        | User          | POST /users with Payload                                             |
| delete        | User          | DELETE /users/5529c97e9fd48bdd4c0ad93d                               |
| follow        | User          | POST /users/5529c97e9fd48bdd4c0ad93d/follow/553353ae8c85e592520cd027 |
| list          | User          | GET /users                                                           |
| update        | User          | PUT /users/5529c97e9fd48bdd4c0ad93d with Payload                     |
| view          | User          | GET /users/5529c97e9fd48bdd4c0ad93d                                  |
| validate      | User          | GET /users/auth/david@gmail.com                                      |

### API Utility endpoints

The server offers also new methods to access user data easily. All these endpoints are in the next table:

| HTTP verbs                | Resource name | HTTP method                                                          |
| ------------------------- | ------------- | -------------------------------------------------------------------- |
| update location           | User          | POST /users/5529c97e9fd48bdd4c0ad93d/location                        |
| upload profile image      | User          | POST /users/5529c97e9fd48bdd4c0ad93d/image                           |
| get profile image         | User          | GET /users/5529c97e9fd48bdd4c0ad93d/image                            |
| get starred               | User          | GET /users/5529c97e9fd48bdd4c0ad93d/starred                          |
| add hug notification      | User          | POST /users/5529c97e9fd48bdd4c0ad93d/notify/553353ae8c85e592520cd027 |
| consume hug notifications | User          | GET /users/5529c97e9fd48bdd4c0ad93d/hug/notifications                |
| accept hug                | User          | POST /users/5529c97e9fd48bdd4c0ad93d/accept/553353ae8c85e592520cd027 |
| consume accepted hugs     | User          | GET /users/5529c97e9fd48bdd4c0ad93d/hugs/accepted/                   |

## TODO
There are some error in the server. The most annoying is related with followers. At the present time there are two known bugs:

 - A user can follow other user as many time as he/she want and a new reference is store each time.
 - If a user is deleted, references remain in the users he/she was following. I have to define a pre('remove') to solve this.

There are more bugs but, Ey! It's something.

![It's something meme](http://davidmogar.leakedbits.com/uploads/github/its_something.png "It's something meme")
