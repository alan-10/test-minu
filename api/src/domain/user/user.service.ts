import { ErrorHandler } from '../../infra/errors/ErrorHandler';
import { UserReponse } from './dtos/reponse/user.response.tdo';
import { CreateUserDTO } from './dtos/request/createUser.dto';
import { UserRepository } from './user.repository';
import bcrypt from 'bcrypt';

export class UserService {

  constructor(private userRepository: UserRepository) { }

  public async createUser(userData: CreateUserDTO): Promise<UserReponse> {

    const UserExists = await this.findByEmail(userData.email);

    if (UserExists) {
      throw new ErrorHandler(409, "Email alread Exists");
    }

    const encryptedPassword = bcrypt.hashSync(userData.password, 10);

    userData.password = encryptedPassword;

    const userCreated = await this.userRepository.createUser(userData);

    return {
      _id: userCreated._id,
      email: userCreated.email,
      name: userCreated.name
    } as UserReponse;

  }

  public async findByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  public async findAll() {
    const allUser = await this.userRepository.findAll();

    const user = allUser.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

    return user;

  }
}