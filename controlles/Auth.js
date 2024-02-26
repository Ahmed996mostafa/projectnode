const jwt=require("jsonwebtoken");
const userSchema=require("../model/TeacherModel");
const bcrypt=require("bcrypt")
const adminSchema=require("../model/Admin")




exports.signin = async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        const admin = await adminSchema.findOne({ email });
        if (user) {
            console.log(user)
            const auth = await bcrypt.compare(password, user.password); 
            if (auth) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        role: "teacher"
                    },
                    process.env.secret_key,
                    { expiresIn: '1h' }
                );
                return res.status(200).json({ user, token });
            } else {
                let error = new Error("Username or password incorrect");
                error.status = 401;
                throw error;
            }
        } 
        else if (admin) {
            console.log(admin)
            const auth = await bcrypt.compare(password, admin.password); 
            if (auth) {
                const token = jwt.sign(
                    {
                        role: "admin"
                    },
                    process.env.secret_key,
                    { expiresIn: "24h" }
                );
                return res.status(200).json({ admin, token });
            } else {
                let error = new Error("Username or password incorrect");
                error.status = 401;
                throw error;
            }
        } 
        else {
            let error = new Error("User not found");
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};




exports.signup=(req,res,next)=>{
    const newUser=new userSchema({
        fullname:req.body.fullname,
        role:"teacher",
        password:req.body.password,
        image:req.body.image,
        email:req.body.email
    })
    const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.secret_key,{expiresIn:'1h'})
    newUser.save().then(data=>{
        console.log("added new sign up")
        res.json({data,token})
    }).catch(error=>next(error))
}





exports.ChangePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userSchema.findOne({ email: email });

        if (!user) {
            throw new Error("User not found");
        } else {
            user.password = password;
            await user.save();
            res.status(200).json({ message: "Password changed successfully" });
        }
    } catch (error) {
        next(error); 
    }
};





