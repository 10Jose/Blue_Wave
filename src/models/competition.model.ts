export interface Competition {
  id: number;
  name: string;
  type: string;
  start_date: string;        
  end_date: string | null;   
  place: string | null;
  pool: string | null;
  category: string | null;
  state: string;             
  description: string | null;
}