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

| HTTP verbs    | Resource name | HTTP method                               |
| ------------- | ------------- | ----------------------------------------- |
| create        | Comment       | POST /comments with Payload               |
| delete        | Comment       | DELETE /comments/5529c97e9fd48bdd4c0ad93d |
| view          | Comment       | GET /comments/5529c97e9fd48bdd4c0ad93d    |
| count         | Hug           | GET /hugs/david                           |
| create        | Hug           | POST /hugs with Payload                   |
| list          | Hug           | GET /hugs                                 |
| create        | User          | POST /users with Payload                  |
| delete        | User          | DELETE /users/david                       |
| follow        | User          | POST /users/david/follow/jorge            |
| list          | User          | GET /users                                |
| update        | User          | PUT /users/david with Payload             |
| view          | User          | GET /users/david                          |

## TODO
There are some error in the server. The most annoying is related with followers. At the present time there are two known bugs:

 - A user can follow other user as many time as he/she want and a new reference is store each time.
 - If a user is deleted, references remain in the users he/she was following. I have to define a pre('remove') to solve this.

There are more bugs but, Ey! It's something.

![It's something meme](http://davidmogar.com/uploads/github/its_something.png "It's something meme")
