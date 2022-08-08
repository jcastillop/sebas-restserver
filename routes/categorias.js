const { Router } = require('express');
const { body, check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { existeCategoriaId, existeCategoriaNombre, esAppValida } = require('../helpers/db-validators');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');



const router = Router();
/**
 * {{url}}/api/categorias
 */
router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    validarCampos
], obtenerCategoria);

router.post('/', [ 
    validarJWT, 
    body('app','Es necesario el id de la app').notEmpty(),
    body('nombre','El nombre es obligatorio').notEmpty(),
    body('usuario','Es necesario el id del usuario').notEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
    check('nombre').custom( existeCategoriaNombre ),
    body('app').custom( esAppValida ),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaId ),
], borrarCategoria);

module.exports = router;