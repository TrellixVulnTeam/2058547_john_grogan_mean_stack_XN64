const { application } = require("express");
let classModel = require("../model/class.model");

let getAllClassDetails = (req,res)=>{
    classModel.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }
        else{
            res.json(err)
        }
    })
}

let storedClassInfo = (req,res)=>{

    let product = req.body;
    classModel.insertMany(product,(err,result)=>{
        if(!err){
            res.send(`Course Succesfully Added! <br><br>
            <a href="//localhost:9090/add">Back</a>
            `)
        }
        else{
            res.send(`Course Id already exsists! Please try again <br><br> 
            <a href="//localhost:9090/add">Back</a>
            `)
        }
    })
}

let deleteClass = (request,response)=>{
    let cid = request.params.cid;
    classModel.deleteOne({_id:cid}, (err,result)=>{
        if(!err){
            if(result.deleteCount == 0){
                res.send(`Course Id does NOT exsist! Please try again. <br><br> 
            <a href="//localhost:9090/delete">Back</a>
            `)
            }
            else{
                res.send(`Course Deleted! <br><br> 
            <a href="//localhost:9090/delete">Back</a>
            `)
            }
        }
        else{
            response.send(err)
        }
    })
}

let updateClassDetails = (request,response)=>{
    let classes = request.body;
    classModel.updateOne({_id:classes._id}, {$set:{ammount:classes.ammount}}, (err,result)=>{
        if(!err){
            response.send(result)
            if(result.modifiedCount == 0){
                //wrong id or same ammount
            }
            else{
                //correct and changed 
            }
        }
        else{
            response.send(err)
        }
    })
}



module.exports = {getAllClassDetails, storedClassInfo, deleteClass, updateClassDetails}