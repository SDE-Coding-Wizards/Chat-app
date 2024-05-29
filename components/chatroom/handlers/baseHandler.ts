import { MessageWithLoading } from "@/types/message";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: MessageWithLoading): JSX.Element | null;
}

// AbstractHandler class to handle the chaining
export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | undefined;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(message: MessageWithLoading): JSX.Element | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(message);
    }
    return null;
  }
}
