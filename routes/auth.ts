import { Router } from 'express';
import { login } from '../controllers/auth';
import { body, check } from 'express-validator';
import { validarCampos, validarJWT } from '../middlewares';
//import { putUsuario } from '../controllers/usuarios';
//import { existeUsuarioId } from '../helpers';


const router = Router();

// router.put('/:id', [
//     validarJWT,
//     check('id', 'Envíe un ID válido').isMongoId(),
//     check('id').custom( existeUsuarioId ),
//     validarCampos
// ], putUsuario );

router.post('/login', [
    body('user')
        .notEmpty()             .withMessage('El campo usuario no puede estar vacío')
    ,
    body('password')
        .notEmpty()             .withMessage('El campo password no puede estar vacío')
        .isLength({ min: 4 })   .withMessage('La contraseña debe tener como mínimo 4 caracteres')
        .isAlphanumeric()       .withMessage('solo estan permitidos caracteres alphanuméricos')
    ,
    validarCampos
], login);

export default router;