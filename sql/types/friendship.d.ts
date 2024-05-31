interface friendship {
  uuid: UUID;
  user_uuid_1: user["uuid"];
  user_uuid_2: user["uuid"];
  created_at: Date;

  user: user;
}
