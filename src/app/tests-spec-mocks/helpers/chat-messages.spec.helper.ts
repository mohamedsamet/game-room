import { ChatModel } from '../../models/chat/chat.model';
import { UserWriterStatusModel } from '../../models/user/user-writer-status.model';

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
}
