import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        let token = null;
        if (authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        if (!token) token = req.cookies?.token;
        if (!token) token = req.body?.token;
        if (!token) token = req.query?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        })
    }
}
export default isAuthenticated;
