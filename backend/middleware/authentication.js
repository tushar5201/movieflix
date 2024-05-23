import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies;
        const verifyToken = jwt.verify(token, 'hellofuckyou');
        const rootUser = await Users.findOne({ _id: verifyToken._id });

        if (!rootUser) { throw new Error('User not found') }

        req.rootUser = rootUser;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized token.')
        console.log(err);
    }
}

export default authentication;