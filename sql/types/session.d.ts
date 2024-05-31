interface session {
  uuid: UUID;
  user_uuid: string;
  symm_key?: string;
  public_key?: string;
}
