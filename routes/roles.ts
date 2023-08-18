import { Router } from 'express';
import { rolNuevo, rolObtener, rolListar, rolActualizar, rolEliminar } from '../controllers/roles';

const router = Router();

router.post('/', [], rolNuevo);
router.get('/', [], rolObtener);
router.get('/listar', [], rolListar);
router.put('/actualizar', [], rolActualizar);
router.delete('/eliminar', [], rolEliminar);