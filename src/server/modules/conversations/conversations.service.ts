import { Model } from 'mongoose';
import { IConversationDocument } from './conversations.interface';
import ConversationModel from './conversations.model';

class ConversationsService {
  private Conversation: Model<IConversationDocument>;
  
  constructor(Conversation: Model<IConversationDocument>) {
    this.Conversation = Conversation;
  }

  async getConversationsForUser(userId: string) {
    return this.Conversation.find({ users: userId });
  }

  async saveConversation(conversation: IConversationDocument) {
    await conversation.save();
    return conversation;
  }

  async pushMessage(message: any) {
    const users = [message.from, message.to];
    const msg = { from: message.from, content: message.content };

    // Chekc if conversation exists
    const conversation = await this.Conversation.findOne({ users: { $in: users }});
    if(!conversation) {
      // Create new conversation with those users
      const conv = new ConversationModel({ users });
      await this.saveConversation(conv);
    }

    return this.Conversation.findOneAndUpdate({
      users: { $in: users }
    }, { 
      $push: { messages: msg }
    }, {
      new: true
    })
  }
}

export default new ConversationsService(ConversationModel);