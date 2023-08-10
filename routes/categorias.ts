import { Router } from 'express';
import { body } from 'express-validator';
import { validarCampos } from '../middlewares';
import { usuarioNuevo } from '../controllers/usuarios';
import { esApplicationValida, existeUsuarioNombre } from '../helpers/db-validators'
import { categoriaActualizar, categoriaBorrar, categoriaListar, categoriaNuevo, categoriaObtener } from '../controllers/categorias';


const router = Router();

router.post('/',        categoriaNuevo);
router.get('/',         categoriaListar);
router.get('/:id',      categoriaObtener);
router.put('/:id',      categoriaActualizar);
router.delete('/:id',   categoriaBorrar);

export default router;