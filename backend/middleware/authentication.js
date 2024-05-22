import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const authentication = async (req, res, next) => {
    try {
        // const token = localStorage.getItem("movieflix");
        const token = req.cookies.movieflix;
        // console.log(token);
        const verifyToken = jwt.verify(token, 'hellofuckyou');
        const rootUser = await Users.findOne({ _id: verifyToken._id, 'tokens.token': token });

        if (!rootUser) { throw new Error('User not found') }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized token.')
        console.log(err);
    }
}

export default authentication;