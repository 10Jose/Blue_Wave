import { Router } from 'express';
import {
  obtenerCompetitions,
  obtenerCompetitionPorId,
  crearCompetition,
  actualizarCompetition,
  eliminarCompetition
} from '../controllers/competitions.controller';

const router = Router();

router.get('/', obtenerCompetitions);
router.get('/:id', obtenerCompetitionPorId);
router.post('/', crearCompetition);
router.put('/:id', actualizarCompetition);
router.delete('/:id', eliminarCompetition);

export default router;