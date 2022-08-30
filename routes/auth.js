const { Router } = require('express');
const { body } = require('express-validator');

const { login, validarTokenUsuario } = require('../controllers/auth');
const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

router.post('/login', [
    body('correo', 'El correo es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], login );

router.get('/',[
    validarJWT
], validarTokenUsuario );

module.exports = router;