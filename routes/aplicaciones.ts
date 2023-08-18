import { Router } from 'express';
import { aplicacionActualizar, aplicacionEliminar, aplicacionListar, aplicacionNuevo, aplicacionObtener } from '../controllers/aplicaciones';

const router = Router();

router.post('/', [], aplicacionNuevo);
router.get('/', [], aplicacionObtener);
router.get('/listar', [], aplicacionListar);
router.put('/actualizar', [], aplicacionActualizar);
router.delete('/eliminar', [], aplicacionEliminar);