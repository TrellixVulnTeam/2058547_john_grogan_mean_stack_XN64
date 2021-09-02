let mongoClient = require('mongodb').MongoClient;
let fs = require('fs');

let url = "mongodb://localhost:27017"

mongoClient.connect(url,(err,client)=>{
    if(!err){
        console.log("Connected");
        let db = client.db("ABC_Corp")

        let data = JSON.parse(fs.readFileSync("call_data.json").toString());

        db.collection("Call_Record").insertMany(data,(err,result)=>{
            if(!err){
                console.log(result);
            }
            else{
                console.log(err);
            }
            client.close()
        })
    }
    else{
        console.log(err)
    }
})