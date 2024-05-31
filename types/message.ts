interface TextMessage extends message {
  chatKey: string;
  isCurrentUser?: boolean;
}

interface MessageWithLoading extends message {
  isLoading?: boolean;
}
