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

crear: async (datos: any): Promise<Swimmer> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const swimmerQuery = `
      INSERT INTO swimmers (name, document, birth_date, gender, email, phone, category, active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const swimmerValues = [
      datos.name,
      datos.document,
      datos.birth_date,
      datos.gender,
      datos.email || null,
      datos.phone || null,
      datos.category || null,
      datos.active ?? true,
    ];
    const swimmerResult = await client.query(swimmerQuery, swimmerValues);
    const nuevoSwimmer = swimmerResult.rows[0];

    if (datos.email && datos.password) {
      const userQuery = `
        INSERT INTO users (email, password, swimmer_id, role, active)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await client.query(userQuery, [
        datos.email,
        datos.password,
        nuevoSwimmer.id,
        'swimmer',
        true,
      ]);
    }

    await client.query('COMMIT');
    return nuevoSwimmer;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
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