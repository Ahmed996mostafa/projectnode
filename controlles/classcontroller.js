const Class=require("../model/classModel")
const Teacher=require("../model/TeacherModel")
exports.GetallClass = (req, res, next) => {
    Class.find({})
    .then((data) => {
        console.log("getAllStudent");
        res.json({ data: data });
    })
    .catch(error => next(error));
};


exports.getclassbyid = (req, res, next) => {
    Class.findOne({ _id: req.params.id})
    .then((data) => {
        if (!data) {
            console.log("class not found");
            throw new Error('class not found');
        }
        console.log("getOneclass");
        res.json({ data: data });
    })
    .catch(error => next(error));
};



exports.insertClass = (req, res, next) => {
    const newClass=new Class(req.body);
    console.log(newClass)
    newClass.save()
    .then((data)=>{
        console.log(data)
        res.status(201).json({message:"added",data});
    })
    .catch(error=>next(error))
};



exports.updateClass = async (req, res, next) => {
    const id = req.body.id;
    try {
        const updateData = req.body;
        const _class = await Class.findOne({ _id: id });
        console.log(_class);
        if (_class) {
            const updatedClass = await Class.findOneAndUpdate({ _id: id }, updateData, { new: true, runValidators: true });
            console.log(updatedClass);
            res.json(updatedClass);
        } else {
            res.status(404).send('Class not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format or other error occurred');
    }
};





exports.deleteClassbyid = (req, res, next) => {
    const classId = req.body.id; 
    Class.findOne({ _id: classId })
        .then((_class) => {
            if (!_class) {
                console.log("Child not found");
                throw new Error('Child not found');
            } else {
                return Class.deleteOne({ _id: classId }); 
            }
        })
        .then(() => {
            console.log("Class deleted");
            res.json({ message: "Class deleted successfully" });
        })
        .catch(error => next(error));
};



exports.getAllClassChildernById = async (req,res,next)=>{
    try {
        const classId = req.params.id
        const result = await Class.findById(classId).populate('children');
        res.status(200).json(result.children)
    } catch (error) {
        next(error)
    }
}


exports.getClassSupervisorInfo = async (req, res, next) => {
    try {
        const cls = await Class.findOne({ _id: req.params.id }).populate('supervisor');
        if (!cls) {
            throw new Error('Class not found');
        }
        const supervisorData = cls.supervisor;
        console.log("getOneClass");
        res.json({ data: supervisorData });
    } catch (error) {
        next(error);
    }
};





// exports.getClassSupervisorInfo = async (req, res, next) => {
//     try {
//         const cls = await Class.findOne({ _id: req.params.id });
//         if (!cls) {
//             throw new Error('Class not found');
//         }

//         const teacher = await Teacher.findOne({ _id: cls.supervisor });
//         if (!teacher) {
//             throw new Error('Supervisor not found');
//         }

//         console.log("getOneClass");
//         res.json({ data: teacher });
//     } catch (error) {
//         next(error);
//     }
// };