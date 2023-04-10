import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticatedUser = async (req, res, next) => {

    const Token = req.headers["x-access-token"];

    if (!Token) {
        return res.status(403).json({
            success: false,
            message: "Please login to access this resource"
        })
    }

    const decodedData = jwt.verify(Token, process.env.SECRET_KEY);

    req.user = decodedData

    next();
}

export default isAuthenticatedUser;