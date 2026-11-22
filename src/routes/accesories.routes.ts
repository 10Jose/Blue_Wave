import { Router } from 'express';
import {
  obtenerAccessories,
  obtenerAccessoryPorId,
  crearAccessory,
  actualizarAccessory,
  eliminarAccessory
} from '../controllers/accessories.controller';

const router = Router();

router.get('/', obtenerAccessories);
router.get('/:id', obtenerAccessoryPorId);
router.post('/', crearAccessory);
router.put('/:id', actualizarAccessory);
router.delete('/:id', eliminarAccessory);

export default router;