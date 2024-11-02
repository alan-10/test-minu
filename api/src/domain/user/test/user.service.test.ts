import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { CreateUserDTO } from '../dtos/request/createUser.dto';
import { UserReponse } from '../dtos/reponse/user.response.tdo';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      getUserByEmail: jest.fn(),
    } as jest.Mocked<UserRepository>;

    userService = new UserService(userRepository);
  });

  it('deve criar um novo usuário com senha criptografada', async () => {
    const userData: CreateUserDTO = { name: 'John Doe', email: 'john@example.com', password: 'senha123' };
    const encryptedPassword = 'senhaCriptografada';
    const userCreated = { _id: '1', name: 'John Doe', email: 'john@example.com', password: encryptedPassword };

    (bcrypt.hashSync as jest.Mock).mockReturnValue(encryptedPassword);
    userRepository.createUser.mockResolvedValue(userCreated);

    const result = await userService.createUser(userData);

    expect(result).toEqual({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    } as UserReponse);

  
    expect(userRepository.createUser).toHaveBeenCalledWith({
      ...userData,
      password: encryptedPassword,
    });
  });

  it('deve retornar um usuário pelo email', async () => {
    const email = 'john@example.com';
    const user = { _id: '1', name: 'John Doe', email, password: 'senha123' };

    userRepository.getUserByEmail.mockResolvedValue(user);

    const result = await userService.findByEmail(email);

    expect(result).toEqual(user);
    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(email);
  });
});


