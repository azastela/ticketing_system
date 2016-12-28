export class User {
  id: number;
  username: string;
  email: string;
  auth_token: string;
  role: string;
  password: string = '';
  password_confirmation: string = '';
}
