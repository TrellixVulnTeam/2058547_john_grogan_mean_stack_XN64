let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let routerClass = require("./router/class.router");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

let url = "mongodb://localhost:27017/classDb"

mongoose.connect(url).
then(res=>console.log("connected")).
catch(error=>console.log(error));

//http://localhost:9090/api/class/getAllClasses
//http://localhost:9090/api/class/storeClass
//http://localhost:9090/api/class/deleteClass/:cid
//http://localhost:9090/api/class/updateClass


app.use("/api/class",routerClass)

app.get("/",(request,response)=>{
    response.sendFile(__dirname+"/index.html")
})
app.get("/add",(request,response)=>{
    response.sendFile(__dirname+"/add.html")
})
app.get("/update",(request,response)=>{
    response.sendFile(__dirname+"/update.html")
})
app.get("/delete",(request,response)=>{
    response.sendFile(__dirname+"/delete.html")
})

app.post("/addClass", (request,response)=>{
    let classDetails = request.body;
    classDetails.ammount = parseInt(classDetails.ammount);
    classDetails._id = parseInt(classDetails._id);

    let url = "http://localhost:9090/api/class/storeClass"
    let xhr = new XMLHttpRequest();
    xhr.open("POST",url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
           response.send(xhr.responseText)
        }};

    xhr.send(JSON.stringify(classDetails));
})

app.post("/deleteClasses", (request,response)=>{
    let classInfo = request.body;
    classInfo._id = parseInt(classInfo._id);

    let url = "http://localhost:9090/api/class/deleteClass/"+classInfo._id;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE",url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
           response.send(xhr.responseText)
        }};

    xhr.send('');
    

    //response.sendFile(__dirname+"/delete.html");
})

app.post("/updateClass", (request,response)=>{
    let classInfo = request.body;
    classInfo._id = parseInt(classInfo._id);
    classInfo.ammount = parseInt(classInfo.ammount);
    
    let url = "http://localhost:9090/api/class/updateClass"
    let xhr = new XMLHttpRequest();
    xhr.open("PUT",url,true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
           response.send(xhr.responseText)
        }};

    xhr.send(JSON.stringify(classInfo));

    //response.sendFile(__dirname+"/update.html");
})

app.get("/fetch", (request,response)=>{
    let url = "http://localhost:9090/api/class/getAllClasses"
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
           response.send(xhr.responseText)
        }};

    xhr.send('');
})




app.listen(9090,console.log("Server running on port 9090"))