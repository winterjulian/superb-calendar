# SuperbCalendar

A simple exemplary calendar application - have fun!

### Setup

1. Run `npm i` to install all necessary packages for this application.
2. Run `node generator.js` to create some exemplary appointments for your calendar. In case an error occurs, the step can be skipped. It is merely nice-to-have.
3. Run `json-server --watch db.json` to start the json-server (before yout start the application itself!). The server needs to run constantly.
4. Run in a new terminal `ng s` to start the SuperbCalendar

### Q&A

1. What is the json-server?
   - A simple lightweight fake backend that is using a json file as database. Further information on https://github.com/typicode/json-server.
2. What is the db.json?
   - The db.json is a fake database in form of a json file. It is part of the json-server.
3. What is the generator.js?
   - It is a vanilla JavaScript file for generating some exemplary appointments for this app. If this script cannot be run, there is already a db.json, but an empty one.
4. Is there any testing?
   - Currently, there is no testing in this app.
