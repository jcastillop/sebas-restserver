import { Router } from 'express';
import { clienteNuevo, clienteObtener, clienteListar, clienteActualizar, clienteEliminar, clienteBuscarPorDocumento } from '../controllers/clientes';

const router = Router();

router.post('/', [], clienteNuevo);
router.get('/', [], clienteObtener);
router.post('/buscar', [], clienteBuscarPorDocumento);
router.get('/listar', [], clienteListar);
router.put('/actualizar', [], clienteActualizar);
router.delete('/eliminar', [], clienteEliminar);

export default router;