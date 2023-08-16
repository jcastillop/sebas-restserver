import { Router } from 'express';
import { productoNuevo, productoObtener, productoListar, productoEliminar } from '../controllers/productos';

const router = Router();

router.post('/',        productoNuevo);
router.get('/',        productoObtener);
router.get('/listar',        productoListar);
router.post('/eliminar',        productoEliminar);

export default router;