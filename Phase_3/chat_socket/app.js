let express = require("express")
let app = express();
let http = require("http").Server(app)
let io = require("socket.io")(http)

let chatting = [
    {chat:"JavaScript",response:"What specific part of JavaScript are you struggling with?"},
    {chat:"angular",response:"What specific part of Angular are you struggling with?"},
    {chat:"html",response:"What specific part of HTML are you struggling with?"},
    {chat:"css",response:"What specific part of CSS are you struggling with?"},
    {chat:"functions",response:"A helpful link for JavaScript functions might <a href='https://www.w3schools.com/js/js_functions.asp'> here </a>! Do you need more help?"},
    {chat:"components",response:"A helpful link for Agnular components might <a href='https://angular.io/api/core/Component'> here </a>! Do you need more help?"},
    {chat:"input tags",response:"A helpful link for HTML Input Tags might <a href='https://www.w3schools.com/tags/tag_input.asp'> here </a>! Do you need more help?"},
    {chat:"floats",response:"A helpful link for CSS floats might <a href='https://www.w3schools.com/css/css_float.asp'> here </a>! Do you need more help?"},
    {chat:"socket.io",response:"A helpful link for socket.io might <a href='https://socket.io/get-started/'> here </a>! Do you need more help?"},
    {chat:"GitHub",response:"A helpful link for GitHub might <a href='https://docs.github.com/en/get-started'> here </a>! Do you need more help?"},
    {chat:"yes", response:"What else do you need help with?"},
    {chat:"no", response:"It was great chatting... Goodbye!"}
]

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/chat.html")
})

io.on("connection", (socket)=>{
    console.log("Client Connected")
    socket.emit("welcome", "Welcome to Chatting with Socket.io How can I help you!")

    socket.on("chating", (msg)=>{
        let result = chatting.findIndex(c=>c.chat == msg);
        if(result < 0){
            socket.emit("response", "Im Sorry but I do not understand your response. Please try again!")
        }
        else{
            socket.emit("response", chatting[result].response)
        }
    })
})

http.listen(9090, ()=>console.log("Server running on port 9090"))