let mongoose = require("mongoose");
mongoose.pluralize(null);

let classSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    ammount: Number
});

let classModel = mongoose.model("Class",classSchema);

module.exports=classModel;