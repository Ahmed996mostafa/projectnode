const child=require("../model/ChildModel")


exports.getallchild = (req, res, next) => {
    child.find({})
            .then((data) => {
                console.log("getAllStudent");
                res.json({ data: data });
            })
            .catch(error => next(error));
};


exports.getchildbyid = (req, res, next) => {
    child.findOne({ _id: req.params.id})
        .then((data) => {
            if (!data) {
                console.log("Student not found");
                throw new Error('Student not found');
            }
            console.log("getOneStudent");
            res.json({ data: data });
        })
        .catch(error => next(error));
};



exports.insertChild = (req, res, next) => {
    const newChild=new child(req.body);
    console.log(newChild)
    newChild.save()
    .then((data)=>{
        console.log(data)
        res.status(201).json({message:"added",data});
    })
    .catch(error=>next(error))
};



exports.updateChild = async (req, res) => {
    const id = req.body.id; 
    try {
        const updateData = req.body;
        const _child = await child.findOne({ _id: id});
        console.log(child);
        if (_child) {
            const updatedChild = await child.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            console.log(updatedChild);
            res.json(updatedChild); 
        } else {
            res.status(404).send('Child not found');
        }
    } catch (error) {
        res.status(400).send('Invalid ID format or other error occurred');
    }
};


exports.deleteChild = (req, res, next) => {
    const childId = req.body.id; 

    child.findOne({ _id: childId })
        .then((child) => {
            if (!child) {
                console.log("Child not found");
                throw new Error('Child not found');
            } else {
                return child.deleteOne({ _id: childId, role: "child" }); 
            }
        })
        .then(() => {
            console.log("Child deleted");
            res.json({ message: "Child deleted successfully" });
        })
        .catch(error => next(error));
};