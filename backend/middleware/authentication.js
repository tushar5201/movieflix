import jwt from "jsonwebtoken";
import Users from "../models/userModel.js"

const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        if (token) {
            const data = jwt.verify(token, process.env.SECRET_KEY);
            if (data) {
                const rootUser = await Users.findOne({ email: data.email });
                if (!rootUser) { return res.sendStatus(410).send('User not found') }
                req.rootUser = rootUser;
                next();
            } else {
                return res.sendStatus(401)
            }
        } else {
            return res.sendStatus(405);
        }
    } catch (err) {
        console.log(err);
    }
}

export default authentication;