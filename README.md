# Readme
This branch contains code for the tasks 2 - 11, excluding task 8.

## Installation and Running
1. Clone the repo
2. In the terminal run `npm link`
3. In the terminal run `run-server <option>`

The server options are as follows:
* `-n` used only for Task 2.  Uses node's http module
* `-e` used for all express.js tasks

This has not been tested on a Windows machine, but it should play nicely.

The default port for both native http and express.js is 8080.  This can be changed by using the `PORT` environment variable.

## Routes
Unless specified all routes support HTTP GET only.
### Task 3
`localhost:8080/static/index.html`
### Task 5
`localhost:8080/home/thing/:id`

The `id` parameter should be numeric and in the app's initial state only 1 and 2 will return data.  The following HTTP verbs are supported:
* GET (Retrieves some data)
* POST (Inserts some data)
* PUT (Creates a new record and inserts)
* PATCH (Updates a record)

### Task 6
Although the error logging middleware is active for all routes.  Making a GET request to `localhost:8080/home/error` will explicitly throw an error.

### Task 7
`localhost:8080/home/mongothing/:id`

The `id` parameter should be numeric (note it is not the _id field) and needs to be set manually when inserting an object.  In real life the object id would be used.  The following HTTP verbs are supported:
* GET
* POST
* DELETE


The db class assumes a connection to a mongo instance running on localhost (not in a container) and a database called ast.  
Use the environment variable `CONNECTION_STRING` to connect to a different database.
### Task 9
`localhost:8080/home/os`
### Task 10
`localhost:8080/home/async/:type`

The `type` parameter is a string and can be either `callback` or `promise`
### Task 11
`localhost:8080/home/event`

This route fires an event.  The output is logged to the console.
`localhost:8080/home/event/off`

This route unbinds the event.  This can be tested by firing the event, unbinding, firing again and then checking the console.