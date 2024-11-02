import { Router } from 'express';

const userRoutes = Router();

import { UserService } from './user.service'
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { Login } from '../auth/login';




const userRepository = new UserRepository();
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const login = new Login(userService);

userRoutes.post('/login', login.vefiry.bind(login));

userRoutes.post('/user', userController.createUser.bind(userController));
userRoutes.get('/user/all', userController.findAll.bind(userController));


export { userRoutes }