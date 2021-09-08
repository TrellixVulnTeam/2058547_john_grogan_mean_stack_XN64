const { application } = require("express");
let classModel = require("../model/class.model");

let getAllClassDetails = (req,res)=>{
    classModel.find({},(err,data)=>{
        if(!err){
            let html = 
            `
            <h1 style="text-align: center;">All Classes</h1>
            <div style="margin: 20px;">
            `
            let tableContent = ""
            let startTable = `<table border=1">
            <tr>
                <th>Course Id</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Amount</th>
            </tr>`
            for(d of data){
                //console.log(d)
                tableContent = tableContent + 
                `
                <tr>
                    <td>`+d._id+`</td>
                    <td>`+d.name+`</td>
                    <td>`+d.description+`</td>
                    <td>`+d.ammount+`</td>
                </tr>
                `
            }
            let tableEnd = `
            </table> <br><br><a href="/">Back</a></div> 
             
            `
            res.send(html + startTable + tableContent + tableEnd)
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
            if(result.deletedCount == 0){
                response.send(`Course Id does NOT exsist! Please try again. <br><br> 
            <a href="//localhost:9090/delete">Back</a>
            `)
            }
            else{
                response.send(`Course Deleted! <br><br> 
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
            if(result.modifiedCount == 0){
                response.send(`Course does not exist or the same amount was entered! <br><br> 
            <a href="//localhost:9090/update">Back</a>
            `)
            }
            else{
                response.send(`Course Succesfully Updated! <br><br> 
            <a href="//localhost:9090/update">Back</a>
            `)
            }
        }
        else{
            response.send(err)
        }
    })
}



module.exports = {getAllClassDetails, storedClassInfo, deleteClass, updateClassDetails}