import { pool } from '../config/database';
import { User } from './user.model';

export const UserModel = {

  obtenerPorEmailConPassword: async (email: string) => {
    const { rows } = await pool.query(
      `SELECT
         u.id AS user_id,
         u.email,
         u.password,
         u.role,
         u.active AS user_active,
         s.id AS swimmer_id,
         s.name,
         s.document,
         s.category,
         s.active AS swimmer_active
       FROM users u
       LEFT JOIN swimmers s ON s.id = u.swimmer_id
       WHERE u.email = $1`,
      [email]
    );
    return rows[0];
  },

  obtenerTodos: async (): Promise<Omit<User, 'password'>[]> => {
    const { rows } = await pool.query(
      'SELECT id, email, swimmer_id, role, active, created_at FROM users ORDER BY id'
    );
    return rows;
  },

  crear: async (datos: Omit<User, 'id' | 'created_at'>): Promise<Omit<User, 'password'>> => {
    const { email, password, swimmer_id, role, active } = datos;
    const query = `
      INSERT INTO users (email, password, swimmer_id, role, active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, swimmer_id, role, active, created_at
    `;
    const values = [email, password, swimmer_id, role ?? 'swimmer', active ?? true];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
};