// types/express.d.ts
import { Request } from 'express';

// Define the structure of the decoded token (assuming it's a JWT)
interface DecodedToken {
  userId: string;
  username: string;
  email: string;
  // Add any other fields you expect in the decoded token
}

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
