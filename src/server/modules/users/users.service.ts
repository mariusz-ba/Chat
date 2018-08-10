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

  async getOnlineUsers() {
    return this.User.find({ socket: { $ne: '' }});
  }

  async getUserById(userId: string) {
    return this.User.findById(userId);
  }

  async saveUser(user: IUserDocument) {
    await user.save();
    return user;
  }

  async connectSocket(userId: string, socketId: string) {
    return this.User.updateOne({ _id: userId }, { $set: { socket: socketId }});
  }

  async disconnectSocket(socketId: string) {
    return this.User.updateOne({ socket: socketId }, { $set: { socket: '' }});
  }

  async getUserBySocket(socketId: string) {
    return this.User.findOne({ socket: socketId });
  }
}

export default new UsersService(UserModel);