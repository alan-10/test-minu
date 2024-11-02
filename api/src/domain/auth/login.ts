import { Request, Response } from 'express'
import { UserService } from "../user/user.service";
import { ErrorHandler } from '../../infra/errors/ErrorHandler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class Login {
  constructor(private userService: UserService) { }

  public async vefiry(request: Request, response: Response) {

    const { email, password } = request.body;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new ErrorHandler(400, "Email or password invalid!");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new ErrorHandler(400, "Email or password invalid!");
    }

    const token = jwt.sign({
      id: user._id, email: user.email,
    },
      process.env.JWT_SECRET!, { expiresIn: '1d' });

    response.status(200).json({token});

  }
}