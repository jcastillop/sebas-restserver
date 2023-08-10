import { Router } from 'express';
import { body } from 'express-validator';
import { validarCampos } from '../middlewares';
import { usuarioNuevo } from '../controllers/usuarios';
import { esApplicationValida, existeUsuarioNombre } from '../helpers/db-validators'


const router = Router();

router.post('/', [
    body('usuario')
        .notEmpty()     .withMessage('El campo usuario no puede estar vacío')
        .custom(val => existeUsuarioNombre(val)),
    body('nombre')
        .notEmpty()     .withMessage('El campo nombre no puede estar vacío'),
    body('password')
        .notEmpty()     .withMessage('El campo password no puede estar vacío'),    
    body('rol')
        .notEmpty()     .withMessage('El campo password no puede estar vacío'),              
    body('application')
        .isMongoId()    .withMessage('Envíe un ID válido')
        .custom(val => esApplicationValida(val)),
    validarCampos
], usuarioNuevo);

// router.get('/',         getUsuarios);
// router.get('/:id',      getUsuario);

// router.put('/:id',      putUsuario);
// router.delete('/:id',   deleteUsuario);

export default router;