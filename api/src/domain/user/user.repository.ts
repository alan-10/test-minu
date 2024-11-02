import { CreateUserDTO } from './dtos/request/createUser.dto';
import UserModel, { IUser } from './model/user.model';

export class UserRepository {

  public async  createUser (userData: CreateUserDTO): Promise<IUser>  {
    const user = new UserModel(userData);
    return await user.save();
  };

  public async getUserByEmail (email: string): Promise<IUser | null>  {
    return await UserModel.findOne({ email });
  };

  public async updateUser  (userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
  };

  public async deleteUser (userId: string): Promise<IUser | null>{
    return await UserModel.findByIdAndDelete(userId);
  };

  public async findAll(){
    return await UserModel.find();
  }

}