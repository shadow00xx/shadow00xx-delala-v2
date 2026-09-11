const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    facebookId: { type: String },
    provider: { type: String },
    displayName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String },
    cloudinary_id: { type: String },
    isVerified: { type: Boolean, default: false },
    isStore:{type: Boolean, default: false },
    isAdmin:{type: Boolean, default: false },
    isowner:{type: Boolean, default: false },
}, { timestamps: true })
module.exports = mongoose.model('User', UserSchema)