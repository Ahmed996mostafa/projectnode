const jwt=require("jsonwebtoken");




module.exports=(req,res,next)=>{
    try
    {
        console.log(req.headers['authorization'])
        let token=req.get("authorization").split(" ")[1];
        console.log(token)
        let decodedToken=jwt.verify(token,process.env.secret_key);
        req.token=decodedToken;
        console.log(req.token)
        next();
    }catch(error)
    {
        error.message="not authenicated";
        error.status=401
        next(error);
    }
}


module.exports.isAdmin=(req,res,next)=>{
    if(req.token.role=="admin")
    next()
    else
    {
        let error=new Error("not authorized");
        error.status=403;
        next(error);
    }
}


module.exports.isTeacher=(req,res,next)=>{
    if(req.token.role=="teacher")
    next()
    else
    {
        let error=new Error("not authorized");
        error.status=403;
        next(error);
    }
}



