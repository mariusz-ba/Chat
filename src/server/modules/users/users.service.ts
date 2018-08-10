import { Model } from 'mongoose';
import { IUserDocument } from './users.interface';
import UserModel from './users.model';
import omit = require('lodash/omit');

class UsersService {
  private User: Model<IUserDocument>;

  constructor(User: Model<IUserDocument>) {
    this.User = User;
  }

  async getUsers() {
    const users = await this.User.find({}, { password: 0 });
    return users.map(user => {          
      return { 
        online: user.socket.length > 0,
        ...omit(user.toObject(), 'socket')
      }
    })
  }

  async getOnlineUsers() {
    return this.User.find({ socket: { $ne: '' }});
  }

  async getUserById(userId: string) {
    const user = await this.User.findById(userId, { password: 0 });
    return {
      online: user.socket.length > 0,
      ...omit(user.toObject(), 'socket')
    }
  }

  async getUserSocket(userId: string) {
    const user = await this.User.findById(userId);
    return user.socket;
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