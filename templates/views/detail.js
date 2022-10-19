const student = require("../../src/app.js");


let first=document.getElementById("firstname")
first.currentTarget.textContent=student.firstname;

console.log(student.firstname)

