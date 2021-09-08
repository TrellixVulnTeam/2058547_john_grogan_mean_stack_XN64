let mongoose = require("mongoose");

mongoose.pluralize(null);

let chatSchema = mongoose.Schema({
    name:{type:String},
    message:{type:String},
    date:{type:String},
    time:{type:String}
})

let chatModel = mongoose.model("ChatLog",chatSchema);

module.exports=chatModel;