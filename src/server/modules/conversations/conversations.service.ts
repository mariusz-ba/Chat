import { Model } from 'mongoose';
import { IConversationDocument } from './conversations.interface';
import ConversationModel from './conversations.model';

class ConversationsService {
  private Conversation: Model<IConversationDocument>;
  
  constructor(Conversation: Model<IConversationDocument>) {
    this.Conversation = Conversation;
  }

  async getConversationsForUser(userId: string) {
    return this.Conversation.find({
      $or: [
        { user1: userId },
        { user2: userId }
      ]
    });
  }

  async saveConversation(conversation: IConversationDocument) {
    await conversation.save();
    return conversation;
  }

  async pushMessage(message: any) {
    const user1 = message.from;
    const user2 = message.to;

    const msg = { from: message.from, content: message.content };

    const condition = {
      $or: [
        {
          user1: user1,
          user2: user2
        },
        {
          user1: user2,
          user2: user1
        }
      ]
    }

    // Chekc if conversation exists
    const conversation = await this.Conversation.findOne(condition);

    if(!conversation) {
      // Create new conversation with those users
      const conv = new ConversationModel({ user1, user2 });
      await this.saveConversation(conv);
    }

    return this.Conversation.findOneAndUpdate(condition, { 
      $push: { messages: msg }
    }, {
      new: true
    })
  }
}

export default new ConversationsService(ConversationModel);