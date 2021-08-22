// Your code here

const { Context } = require("mocha");

function createEmployeeRecord(employeeArray) {
  // load array elements into corresponding object properties
  // initialize empty arrays on the properties timeInEvents and timeOutEvents
  const employeeRecordObject = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  // return JS Object with keys: firstName, familyName, title, payPerHour,
  // timeInEvents, timeOutEvents]
  return employeeRecordObject;
}

function createEmployeeRecords(arrayOfArrays) {
  // Convert each nested array into an employee record using createEmployeeRecord
  // and accumulate it to a new array
  const employeeRecords = arrayOfArrays.map((employeeRecord) =>
    createEmployeeRecord(employeeRecord)
  );

  // Return an array of objects
  return employeeRecords;
}

const testEmployeeRecordObject = {
  firstName: "Steve",
  familyName: "Smith",
  title: "Boss",
  payPerHour: 150,
  timeInEvents: [],
  timeOutEvents: [],
};

const testTimeInStamp = "2021-08-20 1500";
const testTimeOutStamp = "2021-08-20 1800";

createTimeInEvent(testEmployeeRecordObject, testTimeInStamp);
createTimeOutEvent(testEmployeeRecordObject, testTimeOutStamp);

function createTimeInEvent(employeeRecordObject, dateStamp) {
  // Add an object with keys to the timeInEventsArray on the employeeRecordObject
  // type: set to "TimeIn"
  // hour: derived from arg
  // date: derived from arg

  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10),
  };

  employeeRecordObject.timeInEvents.push(timeInEvent);

  // return employee record
  return employeeRecordObject;
}

function createTimeOutEvent(employeeRecordObject, dateStamp) {
  // Add an object with keys to the timeOutEventsArray on the employeeRecordObject
  // type: set to "TimeOut"
  // hour: derived from arg
  // date: derived from arg

  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0, 10),
  };

  employeeRecordObject.timeOutEvents.push(timeOutEvent);

  // return employee record
  return employeeRecordObject;
}

const testDateOfForm = "2021-08-20";
const testTimeIn2 = "2021-08-21 1200";
const testTimeOut2 = "2021-08-21 1600";

hoursWorkedOnDate(testEmployeeRecordObject, testDateOfForm);
createTimeInEvent(testEmployeeRecordObject, testTimeIn2);
createTimeOutEvent(testEmployeeRecordObject, testTimeOut2);

function hoursWorkedOnDate(employeeRecordObject, dateOfForm) {
  // Given a date, find the number of hours elapsed between date's
  // timeInEvent and timeOutEvent
  const timeInEvent = employeeRecordObject.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === dateOfForm
  );
  const timeIn = timeInEvent.hour;

  const timeOutEvent = employeeRecordObject.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === dateOfForm
  );

  const timeOut = timeOutEvent.hour;

  // return hours worked as an integer
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeRecordObject, dateOfForm) {
  // Use hoursWorkedOnDate to multiply the hours by the employeeRecordObject's
  // payRate to determine amount owed (as a number)
  const hoursWorked = hoursWorkedOnDate(employeeRecordObject, dateOfForm);
  const payOwed = hoursWorked * employeeRecordObject.payPerHour;

  // return pay owed
  return payOwed;
}

allWagesFor(testEmployeeRecordObject);

function allWagesFor(employeeRecordObject) {
  // HINT: find the available dates somehow
  const datesWorkedArray = employeeRecordObject.timeInEvents.map(
    (timeInEvent) => timeInEvent.date
  );

  // Use wagesEarnedOnDate and accumulate the value of all dates
  //    worked by the employee in the record used as context
  // use .call or .apply to accumulate the value of all dates for a given employee
  const wagesEarnedArray = datesWorkedArray.map((dateWorked) =>
    wagesEarnedOnDate(employeeRecordObject, dateWorked)
  );

  const allWagesEarned = wagesEarnedArray.reduce((a, b) => a + b);

  // return pay owed for all dates as a number
  return allWagesEarned;
}

function calculatePayroll(arrayOfEmployeeRecords) {
  // Use wagesEarnedOnDate to accumulate the value of all dates worked
  // by the employee in record used as context.

  // Iterate through array of employee records and call allWagesFor on each employee, aggregating wages
  const arrayOfWages = arrayOfEmployeeRecords.map((employeeRecord) =>
    allWagesFor(employeeRecord)
  );

  const totalWages = arrayOfWages.reduce((a, b) => a + b);

  // return sum of pay owed to all employees for all dates as a number
  return totalWages;
}
