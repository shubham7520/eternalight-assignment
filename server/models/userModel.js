import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return Jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE });
}

userSchema.methods.comparePassword = function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password);
}

const user = mongoose.model('User', userSchema);

export default user;