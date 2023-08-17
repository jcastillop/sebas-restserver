import { Router } from 'express';
import { login, validarTokenUsuario } from '../controllers/auth';
import { body, check } from 'express-validator';
import { validarCampos, validarJWT } from '../middlewares';

const router = Router();

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

router.get('/', validarTokenUsuario);

export default router;