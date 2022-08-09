const { Router } = require('express');
const { body, check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { crearMedida, obtenerMedida, obtenerMedidas, actualizarMedida, borrarMedida } = require('../controllers/medidas');

const router = Router();

router.get('/', obtenerMedidas);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    validarCampos    
], obtenerMedida);

router.post('/', [ 
    validarJWT, 
    body('nombre','Es necesario el nombre de la app').notEmpty(),
    body('codigo','El codigo es obligatorio').notEmpty(),
    validarCampos
], crearMedida);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], actualizarMedida);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], borrarMedida);

module.exports = router;