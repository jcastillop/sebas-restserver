import { Router } from 'express';

import { categoriaActualizar, categoriaBorrar, categoriaListar, categoriaNuevo, categoriaObtener } from '../controllers/categorias';


const router = Router();

router.post('/',        categoriaNuevo);
router.get('/',         categoriaListar);
router.get('/:id',      categoriaObtener);
router.put('/:id',      categoriaActualizar);
router.delete('/:id',   categoriaBorrar);

export default router;