export interface Accessory {
  id: number;
  name: string;
  category: string | null;
  brand: string | null;
  model: string | null;
  size: string | null;
  color: string | null;
  price: string | null;  
  stock: number;
  description: string | null;
}