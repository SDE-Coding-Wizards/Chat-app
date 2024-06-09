declare namespace friend_request {
  export interface referencing {
    sender: user;
    receiver: user;
  }

  export interface referenced {}
}

interface friend_request extends friend_request.referencing, friend_request.referenced {
  uuid: UUID;
  sender_uuid: user["uuid"];
  receiver_uuid: user["uuid"];
  isAccepted?: boolean;
  date_sent: Date;
}
