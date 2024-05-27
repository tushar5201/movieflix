import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const authentication = async (req, res, next) => {
    // try {
    //     const token = req.cookies.movieflixToken;
    //     if (token) {
    //         const verifyToken = jwt.verify(token, 'hellofuckyou');
    //         const rootUser = await Users.findOne({ _id: verifyToken._id });

    //         if (!rootUser) { throw new Error('User not found') }

    //         req.rootUser = rootUser;
    //     } else {
    //         res.status(403).send('Token not found')
    //     }
    //     next();
    // } catch (err) {
    //     res.status(401).send('Unauthorized token.')
    //     console.log(err);
    // }.

    const token = req.cookies.movieflixToken;
    if (!token) {
        return res.sendStatus(403);
    }

    const data = jwt.verify(token, "h");
    if (data) {
        const rootUser = await Users.findOne({ email: data.email });
        if (!rootUser) { return res.sendStatus(410).send('User not found') }
        req.rootUser = rootUser;
        return next();
    } else {
        return res.sendStatus(401)
    }
}

export default authentication;