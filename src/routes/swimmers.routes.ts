import { Router } from 'express';
import {
  obtenerSwimmers,
  obtenerSwimmerPorId,
  crearSwimmer,
  actualizarSwimmer,
  eliminarSwimmer
} from '../controllers/swimmers.controller';

const router = Router();

router.get('/', obtenerSwimmers);
router.get('/:id', obtenerSwimmerPorId);
router.post('/', crearSwimmer);
router.put('/:id', actualizarSwimmer);
router.delete('/:id', eliminarSwimmer);

export default router;