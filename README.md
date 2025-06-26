# Superb Calendar

![superb-calendar-screenshot](https://github.com/user-attachments/assets/e741daed-c2ff-4f88-894b-f990c1f82473)
A simple exemplary calendar application - have fun!

### Development Setup

1. Install with `npm i` all necessary packages for this application.
2. Run `node generator.js` to create some exemplary appointments for your current calendar week. In case an error occurs, the step can be skipped. It is merely nice-to-have.
3. Start the fake server with `json-server --watch db.json` (before you start the application itself!). The server needs to run constantly.
4. In a new console window: Run `ng s` to start the SuperbCalendar

### Additional Features

- `ng lint` to lint the TypeScript files
- `ng test` to run all tests with Jest 

### Production Setup (with Docker)

1. Make sure to have Docker installed.
2. Build the image: `docker build -t superb-calendar .`
3. Run the container: `docker compose up -d`
4. Access the app at: http://localhost:4200

> **Caution: The JSON server is not dockerized. There will be no appointments and no successful backend interactions.**

## What to expect?

| Area             |                             |
|------------------|-----------------------------|
| AI               | ❌                           | 
| Backend          | json-server                 | 
| Dark mode        | ✅                           |
| Database         | Json file (db.json)         |
| Reactivity       | Subjects (BehaviorSubjects) |
| Special features | Containerized               |
| Styling          | css, self-written           |
| Testing          | Integration                 |

## Q&A

1. What is the json-server?
  - https://github.com/typicode/json-server - A simple lightweight fake backend that is using a json file as database.
2. What is the [db.json](db.json)?
  - The db.json is a fake database in form of a json file. It is part of the json-server.
3. What is the [generator.js](generator.js)?
  - It is a vanilla JavaScript file for generating some exemplary appointments for this app. If this script cannot be run, there is already a db.json, but an empty one.
4. How about the testing?
  - There is partial testing. Unit testing is currently being implemented. However, there are already some integration tests that have been designed and refined with AI.
