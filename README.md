# App Base projects

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```
    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

### Structure
The structure also contains a gulpfile.js and a server folder. The server is there just so we can serve the app using node. Feel free to use any server you wish.

	/src
		/client
			/app
			/content

### Installing Packages
When you generate the project it should run these commands, but if you notice missing packages, run these again:

 - `npm install`
 - `bower install`

### The Modules
The app is divided by entities wich have their own models inside. Configuration folder (config) and utilities folder (utils).

```
app --> [
     config --> [
         dir.dir.js,
         db.password,
         ...
     ],
     user --> [
        user.controller.js,
        user.model.js,
        ...
     ],
     user_token --> [
        user_token.model.js
        ...
     ]
     core --> [
         model.js,
         controller.js,
         ...
     ],
]
```
### Basic Packages
body-parser: Package for reading JSON objects on request.

simple-encryptor: Package for encrypting passwords into the database

uuid: Package for generating random tokens for user session

node-cron: Package for creating cron schedules wich erase the token database (for now)


### Global configuration

In app/config we can found the global variables wich we use in the app.

-port.js = indicates the port where the app is running.

-time.interval.js = indicates the time interval (in minutes) where the token database is cleared.

-db.dir = indicates the direction of the database.

-db.password = indicates the password of the database.

-db.username = indicates the username of the database.
