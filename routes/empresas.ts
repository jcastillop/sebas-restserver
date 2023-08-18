import { Router } from 'express';
import { empresaNuevo, empresaObtener, empresaListar, empresaActualizar, empresaEliminar } from '../controllers/empresas';

const router = Router();

router.post('/', [], empresaNuevo);
router.get('/', [], empresaObtener);
router.get('/listar', [], empresaListar);
router.put('/actualizar', [], empresaActualizar);
router.delete('/eliminar', [], empresaEliminar);