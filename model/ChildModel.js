
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


/*----------------------create schema-------------------------------*/ 
const AddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true }
});


const ChildSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    age: { type: Number }, 
    level: { type: String, required: true, enum: ["PreKG", "KG1", "KG1"] },
    address: AddressSchema ,
    role: { type: String, default: "child", immutable: false }
},{_id:false});

    /*-------------------------map scheam-----------------------*/
    ChildSchema.plugin(AutoIncrement);
    module.exports=mongoose.model("children",ChildSchema)