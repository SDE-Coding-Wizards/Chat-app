declare namespace user_setting {
  export interface referencing {
    user: user;
  }

  export interface referenced {}
}

interface user_setting extends user_setting.referencing, user_setting.referenced {
  uuid: user["uuid"];
}
