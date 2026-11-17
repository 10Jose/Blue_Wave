import { pool } from '../config/database';
import { Competition } from './competition.model';

export const CompetitionModel = {

  obtenerTodos: async (): Promise<Competition[]> => {
    const { rows } = await pool.query('SELECT * FROM competitions ORDER BY id ASC');
    return rows;
  },

  obtenerPorId: async (id: number): Promise<Competition | undefined> => {
    const { rows } = await pool.query(
      'SELECT * FROM competitions WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  crear: async (datos: Omit<Competition, 'id'>): Promise<Competition> => {
    const { name, type, start_date, end_date, place, pool: poolName, category, state, description } = datos;
    const query = `
      INSERT INTO competitions (name, type, start_date, end_date, place, pool, category, state, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [
      name, type, start_date, end_date, place, poolName,
      category, state ?? 'scheduled', description
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  actualizar: async (id: number, datos: Omit<Competition, 'id'>): Promise<Competition | null> => {
    const { name, type, start_date, end_date, place, pool: poolName, category, state, description } = datos;
    const query = `
      UPDATE competitions
      SET name = $1, type = $2, start_date = $3, end_date = $4,
          place = $5, pool = $6, category = $7, state = $8, description = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [
      name, type, start_date, end_date, place, poolName,
      category, state, description, id
    ];
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  },

  eliminar: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM competitions WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  }
};