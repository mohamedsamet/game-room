import { ChatModel } from '../../models/chat/chat.model';
import { UserWriterStatusModel } from '../../models/user/user-writer-status.model';
import { ChatResultModel } from '../../models/chat/chat-result.model';

export class ChatMessagesSpecHelper {
  public static ChatMessages: ChatModel[] = [
    {
      pseudo: 'yasmin',
      dateTimeParsed: '11:35',
      message: 'hello there',
      userId: 'popoe'
    },
    {
      pseudo: 'samet',
      dateTimeParsed: '11:55',
      message: 'hello',
      userId: 'azeaze'
    }
  ];

  public static ChatMessage: ChatModel = {
      pseudo: 'marwa',
      dateTimeParsed: '13:35',
      message: 'zzz there',
      userId: 'zzz'
    };

  public static usersInRoom: UserWriterStatusModel[] = [
    {
      _id:'78999',
      status: true,
      pseudo: 'samet',
      roomId: 'aze'
    },
    {
      _id:'4566',
      status: true,
      pseudo: 'yasmine',
      roomId: 'aze'
    }
  ];

  public static getChatMessageByPage(): ChatResultModel {
    const chatResultModel = {} as ChatResultModel;
    const chatModel = {} as ChatModel;
    chatModel.userId = '456';
    chatModel.message = 'aze';
    chatModel.dateTimeParsed = '18:02';
    chatModel.pseudo = 'samet';
    chatResultModel.total = 1;
    chatResultModel.messages = [chatModel];
    return chatResultModel;
  }
}
