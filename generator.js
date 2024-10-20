let today = new Date();

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// 0 = sunday
// treat like 7 to place appointments from monday before given sunday
let monday = addDays(today, -(today.getDay()===0 ? 7 : today.getDay()) +1);

let data = {
  "appointments": []
};
let desiredWeekDay = [0, 0, 0, 1, 1, 2, 2, 3, 4, 4]

let rawAppointments = [
  {
    "title": "Conversation with Konstantin",
    "startTime": {
      "hour": 8,
      "minute": 30
    },
    "endTime": {
      "hour": 10,
      "minute": 0
    },
    "start": null,
    "end": null,
    "details": "About the current situation in the team",
    "id": 1
  },
  {
    "title": "Database problems: Ideas exchange with team",
    "startTime": {
      "hour": 11,
      "minute": 0
    },
    "endTime": {
      "hour": 12,
      "minute": 0
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 2
  },
  {
    "title": "Lunch break with Miriam",
    "startTime": {
      "hour": 12,
      "minute": 0
    },
    "endTime": {
      "hour": 13,
      "minute": 0
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 3
  },
  {
    "title": "Code review junior engineer",
    "startTime": {
      "hour": 9,
      "minute": 0
    },
    "endTime": {
      "hour": 10,
      "minute": 0
    },
    "start": null,
    "end": null,
    "details": "Feedback about the calendar component; focussing on the missing unsubscribe()",
    "id": 4
  },
  {
    "title": "Call with munich team",
    "startTime": {
      "hour": 16,
      "minute": 0
    },
    "endTime": {
      "hour": 17,
      "minute": 20
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 5
  },
  {
    "title": "Refinement",
    "startTime": {
      "hour": 11,
      "minute": 0
    },
    "endTime": {
      "hour": 11,
      "minute": 40
    },
    "start": null,
    "end": null,
    "details": "Focussing on interactive calendar events (ticket-14021)",
    "id": 6
  },
  {
    "title": "Scrum feedback to Lisa",
    "startTime": {
      "hour": 13,
      "minute": 0
    },
    "endTime": {
      "hour": 13,
      "minute": 20
    },
    "start": null,
    "end": null,
    "details": "Lisa asked for feedback for her first meeting as a scrum master",
    "id": 7
  },
  {
    "title": "NGRX workshop",
    "startTime": {
      "hour": 9,
      "minute": 0
    },
    "endTime": {
      "hour": 12,
      "minute": 15
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 8
  },
  {
    "title": "workshop results presentation",
    "startTime": {
      "hour": 11,
      "minute": 30
    },
    "endTime": {
      "hour": 12,
      "minute": 30
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 9
  },
  {
    "title": "Driving to Munich",
    "startTime": {
      "hour": 15,
      "minute": 30
    },
    "endTime": {
      "hour": 17,
      "minute": 30
    },
    "start": null,
    "end": null,
    "details": undefined,
    "id": 9
  }
]

rawAppointments.forEach((appointment, index) => {
  let currentStart = addDays(monday, desiredWeekDay[index] ? desiredWeekDay[index] : 0);
  let currentEnd = addDays(monday, desiredWeekDay[index] ? desiredWeekDay[index] : 0);

  currentStart.setHours(appointment.startTime.hour);
  currentStart.setMinutes(appointment.startTime.minute);
  appointment.start = currentStart;

  currentEnd.setHours(appointment.endTime.hour);
  currentEnd.setMinutes(appointment.endTime.minute);
  appointment.end = currentEnd;

  appointment.id = String(index+1);

  data.appointments.push(appointment);
})

let jsonData = JSON.stringify(data);

let fs = require('fs');
fs.writeFile("db.json", jsonData, function(err) {
  if(err) console.log('error', err);
});
