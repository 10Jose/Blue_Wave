export interface Swimmer {
  id: number;
  name: string;
  document: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other';
  email: string | null;
  phone: string | null;
  category: string | null;
  active: boolean;
  registration_date: string;
}