import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        isAdmin: Boolean,
        tokens: [
            {
                token: String
            }
        ]
    }
)

//hashing password

userSchema.pre('save', async function (next, error)  {
    if(this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, 'hellofuckyou') // login id
        this.tokens = await this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const Users = mongoose.model('Users', userSchema);

export default Users;