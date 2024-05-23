export interface User {
  uuid?: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  status_id: number;
  image_path?: string;
  bio?: string;
}
