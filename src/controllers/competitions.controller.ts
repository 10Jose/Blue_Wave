import { Request, Response } from 'express';
import { CompetitionModel } from '../models/competition.models';

export const obtenerCompetitions = async (req: Request, res: Response) => {
  const competitions = await CompetitionModel.obtenerTodos();
  res.json(competitions);
};

export const obtenerCompetitionPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const competition = await CompetitionModel.obtenerPorId(id);
  if (!competition) {
    return res.status(404).json({ message: 'Competencia no encontrada' });
  }
  res.json(competition);
};

export const crearCompetition = async (req: Request, res: Response) => {
  const competition = await CompetitionModel.crear(req.body);
  res.status(201).json(competition);
};

export const actualizarCompetition = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const competition = await CompetitionModel.actualizar(id, req.body);
  if (!competition) {
    return res.status(404).json({ message: 'Competencia no encontrada' });
  }
  res.json(competition);
};

export const eliminarCompetition = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = await CompetitionModel.eliminar(id);
  if (!eliminado) {
    return res.status(404).json({ message: 'Competencia no encontrada' });
  }
  res.status(204).send();
};