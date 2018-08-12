import { Document } from 'mongoose';

// User document interface
export interface IUserDocument extends Document {
  socket: string,
  username: string,
  password: string,
  email: string,
  createdAt: number,
  updatedAt: number,
  firstname: string,
  lastname: string,
  avatar: string
}