import { Schema, model } from 'mongoose';
import { IConversationDocument } from './conversations.interface';

const Conversation = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [{
    from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true }
  }]
})

export default model<IConversationDocument>('Conversation', Conversation);