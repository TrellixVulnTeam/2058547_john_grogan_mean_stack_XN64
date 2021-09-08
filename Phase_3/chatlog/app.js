let express = require("express")
let app = express();
let http = require("http").Server(app)
let io = require("socket.io")(http)
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");
let chatRouter = require("./router/chat.router");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(cors());
app.use(bodyParser.json())

let url = "mongodb://localhost:27017/chatlog"

mongoose.connect(url).then(res=>console.log("connected to database")).catch(error=>console.log(error));

//http://localhost:9090/api/chat/storeChat
//http://localhost:9090/api/chat/getChats
app.use("/api/chat",chatRouter);



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/download",(req,res)=>{
    

    let url = "http://localhost:9090/api/chat/getChats"
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
           let text = xhr.responseText
           res.send(JSON.parse(text))
        }};

    xhr.send('');
    

})

io.on("connection", (socket)=>{
    console.log("client connected");
    socket.emit("welcome", "Welcome!")
    
    socket.on("chat",(msg)=>{
        //socket.emit("response","message recived");
        firePost(msg);
    })
})

function firePost(msg){
    let url = "http://localhost:9090/api/chat/storeChat"
    let xhr = new XMLHttpRequest();
    xhr.open("POST",url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           //console.log(xhr.status);
           //console.log(xhr.responseText);
        }};

    xhr.send(JSON.stringify(msg));
}


http.listen(9090, ()=>console.log("Server running on port 9090"))