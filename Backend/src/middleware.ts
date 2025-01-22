import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "index";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken; // Get token from cookies

    if (!token) {
       res.status(401).json({ success: false, message: "Access denied. No token provided." });
       return
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    //   req.user = decoded; 
      next();
    } catch (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
  };
  