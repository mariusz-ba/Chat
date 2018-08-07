import { Model } from 'mongoose';
import { IUserDocument } from './users.interface';
import UserModel from './users.model';

class UsersService {
  private User: Model<IUserDocument>;

  constructor(User: Model<IUserDocument>) {
    this.User = User;
  }

  async getUsers() {
    return this.User.find({});
  }

  async getUserById(userId: string) {
    return this.User.findById(userId);
  }

  async saveUser(user: IUserDocument) {
    await user.save();
    return user;
  }
}

export default new UsersService(UserModel);