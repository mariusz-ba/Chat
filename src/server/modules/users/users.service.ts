import { Model } from 'mongoose';
import { IUserDocument } from './users.interface';
import UserModel from './users.model';
import omit = require('lodash/omit');
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../../config';

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

  async updateUser(userId: string, data: any) {
    try {
      const user = await this.User.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true, select: { password: 0 } });
      return { ok: 1, user };
    } catch (error) {
      console.log(error);
      const user = await this.getUserById(userId);
      return { ok: 0, user };
    }
  }

  async updateUserPassword(userId: string, previous: string, password: string) {
    const user = await this.User.findOne({ _id: userId });
    if(bcrypt.compareSync(previous, user.password)) {
      const hash = await bcrypt.hash(password, saltRounds);
      const updated = await this.User.findOneAndUpdate({ _id: userId }, { $set: { password: hash }}, { new: true });
      if(updated.password === hash)
        return { ok: 1 };
      else
        return { ok: 0 };
    }
    // The previous password doesn't match this existing in database
    return { ok: 0 };
  }
}

export default new UsersService(UserModel);