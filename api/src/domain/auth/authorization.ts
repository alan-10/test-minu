import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../infra/errors/ErrorHandler';



export function authozitation(request:Request, response: Response, next: NextFunction){


  const [,token] =  request.headers.authorization?.split(" ") || [" ", " "];

  try{

      if(!token){
        throw new ErrorHandler(400, "invalid token!");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      if(!payload){
        throw new ErrorHandler(400, "invalid token!");
      }
      

      next();


  }catch(error) {
    console.log(error);
    
    throw new ErrorHandler(401, "Invalid authorization");
  }

}