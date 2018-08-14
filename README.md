# Chat
Chat application written in TypeScript + React and Socket.io.

![Application preview](https://i.imgur.com/qxu8R3A.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for developement purposes.

### Prerequisties

There are __two__ things You have to install in order to get this project running on your machine.
1. Since project uses __NodeJS__ you must have it installed, otherwise you won't be able to start project.
2. Chat uses __MongoDB__ as a storage database. To get project running you must have it installed on your local machine or specify MongoDB server address inside */server/app.ts* file.
```
mongoose.connect('mongodb://your-mongodb-server-address/your-collection-name', ...)
```

### Running

1. To run project make sure you have both NodeJS installed and MongoDB server running.
2. Navigate to chat root directory and execute following commands to run application:
```
npm install
npm start
```

If everything goes well you will get store running on http://localhost:3000

### Issues

If any error has occurred, please let me know by opening issue.
