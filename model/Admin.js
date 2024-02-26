const mongoose = require('mongoose');
const bcrypt=require("bcrypt")



const AdminSchema = new mongoose.Schema({
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true },
    role: { type: String, default: "admin", immutable: false }
});


AdminSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});



module.exports = mongoose.model('admin', AdminSchema);

