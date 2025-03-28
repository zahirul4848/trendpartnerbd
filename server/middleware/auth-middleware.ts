import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


export const isAuth = (req: Request, res: Response, next: NextFunction)=> {
  const authorization = req.headers.authorization;
  if(authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret, (err, user)=> {
      if(err) {
        res.status(401).json({message: "Invalid token"});
      } else {
        req.user = user;
        next();
      }
    })
  } else {
    res.status(401).json({message: "no token"});
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction)=> {
  const role = req.user.role;
  if(req.user && role === "ADMIN") {
    next();
  } else {
    res.status(401).json({message: "Invalid admin token"});
  }
}