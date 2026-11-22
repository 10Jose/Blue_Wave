import { pool } from '../config/database';
import { Accessory } from './accesory.model';

export const AccessoryModel = {

  obtenerTodos: async (): Promise<Accessory[]> => {
    const { rows } = await pool.query('SELECT * FROM accessories ORDER BY id ASC');
    return rows;
  },

  obtenerPorId: async (id: number): Promise<Accessory | undefined> => {
    const { rows } = await pool.query(
      'SELECT * FROM accessories WHERE id = $1',
      [id]
    );
    return rows[0];
  },

  crear: async (datos: Omit<Accessory, 'id'>): Promise<Accessory> => {
    const { name, category, brand, model, size, color, price, stock, description } = datos;
    const query = `
      INSERT INTO accessories (name, category, brand, model, size, color, price, stock, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [name, category, brand, model, size, color, price, stock ?? 0, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  actualizar: async (id: number, datos: Omit<Accessory, 'id'>): Promise<Accessory | null> => {
    const { name, category, brand, model, size, color, price, stock, description } = datos;
    const query = `
      UPDATE accessories
      SET name = $1, category = $2, brand = $3, model = $4,
          size = $5, color = $6, price = $7, stock = $8, description = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [name, category, brand, model, size, color, price, stock, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  },

  eliminar: async (id: number): Promise<boolean> => {
    const { rowCount } = await pool.query(
      'DELETE FROM accessories WHERE id = $1',
      [id]
    );
    return (rowCount ?? 0) > 0;
  }
};