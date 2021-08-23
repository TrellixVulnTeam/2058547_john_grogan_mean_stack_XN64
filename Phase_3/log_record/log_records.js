function addUser(){
    let fs = require("fs")
    let logs = JSON.parse(fs.readFileSync("logs.json").toString());
    debugger;

    let readline = require("readline-sync");
    let fname = readline.question("Enter your First Name: ")
    let lname = readline.question("Enter your Last Name: ")
    let age = readline.questionInt("Enter your Age: ")
    let gender = readline.question("Enter your gender: ")
    debugger;

    var currentdate = new Date(); 
    let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getFullYear()
    let time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    debugger;

    let entry = {fname:fname, lname:lname, age:age, gender:gender, date:date, time:time}
    logs.push(entry)
    debugger;

    fs.writeFileSync("logs.json", JSON.stringify(logs))
    console.log();
    console.log("User has been logged...");
    console.log("The current state of the log is...")
    console.log(logs);
}

addUser()
