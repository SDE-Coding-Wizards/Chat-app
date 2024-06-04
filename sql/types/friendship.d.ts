declare namespace friendship {
  export interface referencing {
    user: user;
  }

  export interface referenced {}
}

interface friendship extends friendship.referencing, friendship.referenced {
  uuid: UUID;
  user_uuid_1: user["uuid"];
  user_uuid_2: user["uuid"];
  created_at: Date;
}
