import { Router } from 'express';
import { clienteNuevo, clienteObtener, clienteListar, clienteActualizar, clienteEliminar } from '../controllers/clientes';

const router = Router();

router.post('/', [], clienteNuevo);
router.get('/', [], clienteObtener);
router.get('/listar', [], clienteListar);
router.put('/actualizar', [], clienteActualizar);
router.delete('/eliminar', [], clienteEliminar);