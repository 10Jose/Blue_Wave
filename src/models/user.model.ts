export interface User {
  id: number;
  email: string;
  password: string;
  swimmer_id: number | null;
  role: string;
  active: boolean;
  created_at: string;
}