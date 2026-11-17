import { Request, Response } from 'express';
import { UserModel } from '../models/user.models';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  const user = await UserModel.obtenerPorEmailConPassword(email);

  if (!user) {
    return res.status(404).json({ message: 'Credenciales incorrectas' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  if (!user.user_active) {
    return res.status(403).json({ message: 'Cuenta inactiva' });
  }

  if (user.swimmer_active === false) {
    return res.status(403).json({ message: 'El nadador está inactivo' });
  }

  // ⚠️ NO devolver el password al frontend
  const { password: _, ...userSinPassword } = user;

  res.json({
    message: 'Login exitoso',
    user: userSinPassword,
  });
};