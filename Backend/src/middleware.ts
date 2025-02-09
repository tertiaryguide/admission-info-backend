// import { NextFunction, Request, Response } from "express";
// import { JWT_SECRET } from "index";
// import jwt from "jsonwebtoken";

// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.cookies.authToken; // Get token from cookies

//     if (!token) {
//        res.status(401).json({ success: false, message: "Access denied. No token provided." });
//        return
//     }

//     try {
//       const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
//       //@ts-ignore
//       req.user.userId = decoded; 
//       next();
//     } catch (err) {
//       return res.status(403).json({ success: false, message: "Invalid or expired token." });
//     }
//   };
  

import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from 'index';

export const SECRET_KEY: Secret = JWT_SECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};
