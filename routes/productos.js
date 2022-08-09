const { Router } = require('express');
const { body, check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { existeProductoId } = require('../helpers/db-validators');

const { edsFillVarsInSpeech } = require('../helpers/fwhelpers');

const speechs = require('../helpers/speechs');

const { obtenerProducto, obtenerProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

/**
 * {{url}}/api/productos
 */
 router.get('/', obtenerProductos);

 router.get('/:id', [
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom( existeProductoId ),
     validarCampos
 ], obtenerProducto);
 
 router.post('/', [ 
     validarJWT, 
     body('nombre', speechs.REQUIRED_VALUE).notEmpty(),
     body('application', speechs.REQUIRED_VALUE).notEmpty(),
     body('medida', speechs.REQUIRED_ID).notEmpty(),
     body('categoria', speechs.REQUIRED_ID).notEmpty(),
     body('cantidad', speechs.REQUIRED_NUMBER_VALUE).isNumeric(),
     body('codigo', speechs.REQUIRED_VALUE).notEmpty(),
     body('valor_unitario', speechs.REQUIRED_NUMBER_VALUE).isNumeric(),
     body('precio_unitario', speechs.REQUIRED_NUMBER_VALUE).isNumeric(),
     body('descuento', speechs.REQUIRED_NUMBER_VALUE).isNumeric(),
     validarCampos
 ], crearProducto);
 
 router.put('/:id', [
     validarJWT,
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom( existeProductoId ),
     validarCampos
 ], actualizarProducto);
 
 router.delete('/:id', [
     validarJWT,
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom( existeProductoId ),
 ], borrarProducto);
 
 module.exports = router;