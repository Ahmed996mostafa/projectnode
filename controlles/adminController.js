const userSchema=require("../model/Admin")


exports.getadmin=(req,res,next)=>{
    userSchema.find({role:"admin"})
    .then((data)=>{
        console.log("get admin")
        res.status(200).json(data);  
    })
    .catch(error=>next(error))
}

exports.insertadmin=(req,res,next)=>{
    const Admin=new userSchema(req.body);
    Admin.save()
    .then((data)=>{
        console.log("succeessfully added admin")
        res.status(201).json({message:"added",data});
    })
    .catch(error=>next(error))
}
