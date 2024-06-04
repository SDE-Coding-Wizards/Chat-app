import { AbstractHandler } from "./baseHandler";
import { EmojiComponent } from "../handlerComponents/emojiHandler";

export class EmojiHandler extends AbstractHandler {
  public handle(message: TextMessage): JSX.Element | null {
    if (message.content?.content_type_id === 2) {
      if (message.content?.content) {
        return <EmojiComponent text={message.content?.content} />;
      }
    }
    return super.handle(message);
  }
}
