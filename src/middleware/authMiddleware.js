import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // If no token or header doesn’t start with “Bearer ”
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // get token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // check secret
    const user = await User.findById(decoded.id).select("-password"); // get user
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    req.user = user; // attach user to request
    next(); // allow access
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;  