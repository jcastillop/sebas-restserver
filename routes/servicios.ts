import { Router } from 'express';
import { servicioNuevo, servicioObtener, servicioListar, servicioActualizar, servicioEliminar, servicioProductoActualizar, servicioProductoEliminar, servicioProductoListar, servicioProductoNuevo, servicioProductoObtener } from '../controllers/servicios';

const router = Router();

router.post('/', [], servicioNuevo);
router.get('/', [], servicioObtener);
router.get('/listar', [], servicioListar);
router.put('/actualizar', [], servicioActualizar);
router.delete('/eliminar', [], servicioEliminar);
router.post('/servicio/producto', [], servicioProductoNuevo);
router.get('/servicio/producto', [], servicioProductoObtener);
router.get('/servicio/producto/listar', [], servicioProductoListar);
router.put('/servicio/producto/actualizar', [], servicioProductoActualizar);
router.delete('/servicio/producto/eliminar', [], servicioProductoEliminar);