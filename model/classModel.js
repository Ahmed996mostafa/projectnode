
const mongoose=require("mongoose")


/*----------------------create schema-------------------------------*/ 
const classroomSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers' }, 
    children: [{ type: Number, ref: 'children' }]   
});
    /*-------------------------map scheam-----------------------*/
    module.exports=mongoose.model("classes",classroomSchema)