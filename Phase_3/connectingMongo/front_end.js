let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


//http://localhost:9090/api/class/getAllClasses
//http://localhost:9090/api/class/storeClass
//http://localhost:9090/api/class/deleteClass/:cid
//http://localhost:9090/api/class/updateClass



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
app.get("/fetch",(request,response)=>{
    response.sendFile(__dirname+"/allClasses.html")
})

app.post("/deleteClasses", (request,response)=>{
    console.log("here");
    let classId = request.body;
    let url = "http://localhost:9090/api/class/deleteClass/"+classId._id;
    //console.log(test);
    response.sendFile(__dirname+"/delete.html")
})

app.post("/updateClass", (request,response)=>{
    let classDetails = request.body;
    classDetails.ammount = parseInt(classDetails.ammount);
    //console.log(classDetails)
    response.sendFile(__dirname+"/update.html")
})




app.listen(4040,console.log("Server running on port 4040"))