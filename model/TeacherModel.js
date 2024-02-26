const mongoose = require('mongoose');
const bcrypt=require("bcrypt")



const teacherSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, default: "teacher", immutable: false }
});


teacherSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('teachers', teacherSchema);

