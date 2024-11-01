# SuperbCalendar

A simple exemplary calendar application - have fun!

### Development Setup

1. Run `npm i` to install all necessary packages for this application.
2. Run `node generator.js` to create some exemplary appointments for your calendar. In case an error occurs, file a complaint to the developer ;)
3. Run `json-server --watch db.json` to start the json-server (before you start the application itself!). The server needs to run constantly.
4. Run in a new terminal `ng s` to start the SuperbCalendar

### Docker Setup
1. Build the image: `docker build -t superb-calendar .`
2. Run the container: `docker compose up -d`
3. Access the app at: http://localhost:4200
  
**Caution: No functionality that needs an API bc. JSON server is
not dockerized.**

### ToDo
Dockerize JSON Server or provide minimum backend so the app works in production.

### Q&A

1. What is the json-server?
   - https://github.com/typicode/json-server - A simple lightweight fake backend that is using a json file as database.
2. What is the [db.json](db.json)?
   - The db.json is a fake database in form of a json file. It is part of the json-server.
3. What is the [generator.js](generator.js)?
   - It is a vanilla JavaScript file for generating some exemplary appointments for this app. If this script cannot be run, there is already a db.json, but an empty one.
4. Is there any testing?
   - Currently, there is no testing in this app.
