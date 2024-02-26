const Teacher = require("../model/TeacherModel");
const Class=require ("../model/classModel")
const multer=require("multer")



exports.GetallTeacher = (req, res, next) => { 
    Teacher.find({ }) 
        .then((data) => {
            console.log("getAllTeacher");
            res.json({ data: data });
        })
        .catch(error => next(error));
};


exports.getteacherbyid = (req, res, next) => {
    Teacher.findOne({ _id: req.params.id})
        .then((data) => {
            if (!data) {
                console.log("teacher not found");
                throw new Error('teacher not found');
            }
            console.log("getOneTeacher");
            res.json({ data: data });
        })
        .catch(error => next(error));
};


exports.addNewTeacher =async (req,res,next)=>{
    console.log(req.body)
    try{
        const imgPath = req.file.path
        const {fullname,email,password} = req.body
        let _email = email.toLowerCase();
        const user = await Teacher.create({
            fullname,
            email:_email,
            password,
            image:imgPath
        })
        res.status(201).json({user})
    }catch(err){
        next(err)
    }}


exports.updateTeacher = async (req, res) => {
    const teacherId = req.body.id; 
    const updateData = req.body;

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updateData, { new: true, runValidators: true });

        if (updatedTeacher) {
            res.json(updatedTeacher); 
        } else {
            res.status(404).send('Teacher not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format or other error occurred');
    }
};


    exports.deleteTeacher = (req, res, next) => {
        const teacherId = req.body.id; 
        Teacher.findOne({ _id: teacherId })
            .then((teacher) => {
                if (!teacher) {
                    console.log("Teacher not found");
                    throw new Error('Teacher not found');
                } else {
                    return Teacher.deleteOne({ _id: teacherId });
                }
            })
            .then(() => {
                console.log("Teacher deleted");
                res.json({ message: "Teacher deleted successfully" });
            })
            .catch(error => next(error));
    };

    
    exports.getAllsupervisor = (req, res, next) => {
        Class.find({})
            .populate('supervisor') 
            .then(data => {
                if(data){
                    const supervisors = data
                        .filter(doc => doc.supervisor) 
                        .map(doc => doc.supervisor);
                    res.json({ supervisors });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({ error: 'cant find' });
            });
    }