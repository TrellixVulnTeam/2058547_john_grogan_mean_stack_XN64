let chatModel = require("../model/chat.model");

let getAllChats = (request,response)=>{
    chatModel.find({},(err,data)=>{
        if(!err){
            response.json(data);
        }else {
             response.json(err);   
        }
    })
}

let storeChatInfo = (request,response) =>{
    console.log("hit");
    let chatInfo = request.body;
    chatModel.insertMany(chatInfo, (err,result)=>{
        if(!err){
            response.send("Record recored correctly");
        }
        else{
            response.send(err)
        }
    })
}

module.exports={storeChatInfo,getAllChats}