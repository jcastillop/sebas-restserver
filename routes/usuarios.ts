import { Router } from 'express';
import { body } from 'express-validator';
import { validarCampos, validarJWT } from '../middlewares';
import { usuarioActualizar, usuarioEliminar, usuarioListar, usuarioNuevo, usuarioObtener } from '../controllers/usuarios';
import { existeUsuarioNombre } from '../helpers/db-validators'


const router = Router();

router.post('/', [
    validarJWT,
    body('usuario')
        .notEmpty()     .withMessage('El campo usuario no puede estar vacío')
        .custom(val => existeUsuarioNombre(val)),
    body('nombre')
        .notEmpty()     .withMessage('El campo nombre no puede estar vacío'),
    body('password')
        .notEmpty()     .withMessage('El campo password no puede estar vacío'),    
    body('rol')
        .notEmpty()     .withMessage('El campo password no puede estar vacío')
        .isMongoId()    .withMessage('Envíe un ID de aplicacion válido'),
    body('aplicacion')
        .notEmpty()     .withMessage('El campo empresa no puede estar vacío')
        .isMongoId()    .withMessage('Envíe un ID de aplicacion válido'),
        //.custom(val => esApplicationValida(val)),
    body('empresa')
        .notEmpty()     .withMessage('El campo empresa no puede estar vacío')
        .isMongoId()    .withMessage('Envíe un ID de empresa válido'),        
    validarCampos
], usuarioNuevo);

router.get('/',        usuarioObtener);
router.get('/listar',        usuarioListar);
router.post('/eliminar', [
    validarJWT,
    validarCampos
], 
usuarioEliminar);
router.put('/actualizar', [
    validarJWT,
    validarCampos    
], 
usuarioActualizar);

export default router;