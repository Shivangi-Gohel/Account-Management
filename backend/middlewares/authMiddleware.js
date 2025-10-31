import { verifyToken } from "../services/jwtService.js";

// This middleware checks the 'Authorization' header for a Bearer token, verifies its validity using the JWT service, and attaches the decoded  user payload to `req.user` for access in downstream route handlers.

export const verifyJWT = (req, res, next) => {
    // Retrieve the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided"});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Malformed token"});
    }

    try {
        // Verify token and attach decoded user data
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};