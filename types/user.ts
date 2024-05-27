export interface User {
  uuid: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: number;
  image_path?: string;
  bio?: string;
  public_key: string
}
