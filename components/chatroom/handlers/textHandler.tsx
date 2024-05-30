import { TextComponent } from "../handlerComponents/textHandler";
import { MessageWithLoading } from "@/types/message";
import { AbstractHandler } from "./baseHandler";
import { decryptMessage } from "@/utils/symmetric";

export class TextHandler extends AbstractHandler {
  public handle(message: MessageWithLoading): JSX.Element | null {
    if (message.content?.content_type_id === 1) {
      if (message.content?.content) {
        return <TextComponent message={message} />;
      }
    }
    return super.handle(message);
  }
}
