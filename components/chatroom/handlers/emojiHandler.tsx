import { EmojiComponent } from "../handlerComponents/emojiHandler";
import { Message } from "@/types/message";
import { AbstractHandler } from "./baseHandler";

export class EmojiHandler extends AbstractHandler {
  public handle(message: Message): JSX.Element | null {
    if (message.content?.content_type_id === 2) {
      if (message.content?.content) {
        return <EmojiComponent text={message.content?.content} />;
      }
    }
    return super.handle(message);
  }
}
