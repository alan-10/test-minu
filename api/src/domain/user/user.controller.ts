import { Request, Response } from 'express'

import { UserService } from './user.service'
export class UserController {

  constructor(private userService: UserService) { }

  public async createUser(request: Request, response: Response) {

    const user = request.body;

    const userCreated = await await this.userService.createUser(user);

    response.status(201).json({ user: userCreated })
  }

  public async findAll(request: Request, response: Response) {

    const users = await this.userService.findAll();

    response.status(201).json({ users: users })
  }

}