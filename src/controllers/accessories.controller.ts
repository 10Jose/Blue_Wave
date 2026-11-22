import { Request, Response } from 'express';
import { AccessoryModel } from '../models/accesory.models';

export const obtenerAccessories = async (req: Request, res: Response) => {
  const accessories = await AccessoryModel.obtenerTodos();
  res.json(accessories);
};

export const obtenerAccessoryPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const accessory = await AccessoryModel.obtenerPorId(id);
  if (!accessory) {
    return res.status(404).json({ message: 'Accesorio no encontrado' });
  }
  res.json(accessory);
};

export const crearAccessory = async (req: Request, res: Response) => {
  const accessory = await AccessoryModel.crear(req.body);
  res.status(201).json(accessory);
};

export const actualizarAccessory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const accessory = await AccessoryModel.actualizar(id, req.body);
  if (!accessory) {
    return res.status(404).json({ message: 'Accesorio no encontrado' });
  }
  res.json(accessory);
};

export const eliminarAccessory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eliminado = await AccessoryModel.eliminar(id);
  if (!eliminado) {
    return res.status(404).json({ message: 'Accesorio no encontrado' });
  }
  res.status(204).send();
};