import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const otpSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        createdAt: Date,
        expiresAt: Date, 
    }
);
otpSchema.pre('save', async function (next, error)  {
    if(this.isModified("otp")) {
        this.otp = bcrypt.hashSync(this.otp, 12);
    }
    next();
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;