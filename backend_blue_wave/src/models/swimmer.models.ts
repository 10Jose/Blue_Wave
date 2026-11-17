import { pool } from '../config/database';
import { Swimmer } from './swimmer.model';

export const SwimmerModel = {

  obtenerTodos: async (): Promise<Swimmer[]> => {
    const { rows } = await pool.query('SELECT * FROM swimmers ORDER BY id ASC');
    return rows;
  },

  obtenerPorId: async (id: number): Promise<Swimmer | undefined> => {
    const { rows } = await pool.query(
      'SELECT * FROM swimmers WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  obtenerPorEmail: async (email: string): Promise<Swimmer | undefined> => {
    const { rows } = await pool.query(
      'SELECT * FROM swimmers WHERE email = $1',
      [email]
    );
    return rows[0];
  },

  crear: async (datos: Omit<Swimmer, 'id' | 'registration_date'>): Promise<Swimmer> => {
    const { name, document, birth_date, gender, email, phone, category, active } = datos;
    const query = `
      INSERT INTO swimmers (name, document, birth_date, gender, email, phone, category, active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [name, document, birth_date, gender, email, phone, category, active ?? true];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  actualizar: async (
    id: number,
    datos: Omit<Swimmer, 'id' | 'registration_date'>
  ): Promise<Swimmer | null> => {
    const { name, document, birth_date, gender, email, phone, category, active } = datos;
    const query = `
      UPDATE swimmers
      SET name = $1, document = $2, birth_date = $3, gender = $4,
          email = $5, phone = $6, category = $7, active = $8
      WHERE id = $9
      RETURNING *
    `;
    const values = [name, document, birth_date, gender, email, phone, category, active, id];
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  },

  eliminar: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM swimmers WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  }
};