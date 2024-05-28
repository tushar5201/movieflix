import jwt from "jsonwebtoken";
import Users from "../models/userModel.js"


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
    // }

    // const token = req.cookies.movieflixToken;
    // if (token) {
    //     const data = await jwt.verify(token, process.env.SECRET_KEY);
    //     if (data) {
    //         const rootUser = await Users.findOne({ email: data.user.email });
    //         if (!rootUser) { return res.sendStatus(410).send('User not found') }
    //         req.rootUser = rootUser;
    //         next();
    //     } else {
    //         return res.sendStatus(401)
    //     }
    // } else {
    //     return res.sendStatus(403);
    // }

    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invelid Token' })
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(401).send({ message: 'No Token' });
    }

}

export default authentication;