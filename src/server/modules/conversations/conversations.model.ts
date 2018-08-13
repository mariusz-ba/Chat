import { Schema, model } from 'mongoose';
import { IConversationDocument } from './conversations.interface';

const Conversation = new Schema({
  user1: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  user2: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  messages: [{
    from: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true }
  }]
})

Conversation.index({ user1: 1, user2: 1 }, { unique: true });

export default model<IConversationDocument>('Conversation', Conversation);