import { Document, Schema } from 'mongoose';

export interface IUsers {
  [index: number]: Schema.Types.ObjectId
}

export interface IMessages {
  [index: number]: { from: Schema.Types.ObjectId, content: string }
}

export interface IConversationDocument extends Document {
  users: IUsers,
  messages: IMessages
}