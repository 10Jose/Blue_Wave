import { Request, Response } from 'express';
import { SwimmerModel } from '../models/swimmer.models';

export const obtenerSwimmers = async (req: Request, res: Response) => {
  const swimmers = await SwimmerModel.obtenerTodos();
  res.json(swimmers);
};

export const obtenerSwimmerPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const swimmer = await SwimmerModel.obtenerPorId(id);
  if (!swimmer) {
    return res.status(404).json({ message: 'Nadador no encontrado' });
  }
  res.json(swimmer);
};

export const crearSwimmer = async (req: Request, res: Response) => {
  const swimmer = await SwimmerModel.crear(req.body);
  res.status(201).json(swimmer);
};

export const actualizarSwimmer = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const swimmer = await SwimmerModel.actualizar(id, req.body);
  if (!swimmer) {
    return res.status(404).json({ message: 'Nadador no encontrado' });
  }
  res.json(swimmer);
};

export const eliminarSwimmer = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = await SwimmerModel.eliminar(id);
  if (!eliminado) {
    return res.status(404).json({ message: 'Nadador no encontrado' });
  }
  res.status(204).send();
};