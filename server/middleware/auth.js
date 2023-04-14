import jwt from "jsonwebtoken";


const isAuthenticatedUser = async (req, res, next) => {

    try {
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
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Invalid token"
        })
    }

}

export default isAuthenticatedUser;