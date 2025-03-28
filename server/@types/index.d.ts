import { Request } from "express";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Record<User>;
      file: any;
      files: any[];
    }
  }
}
