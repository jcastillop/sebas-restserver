const { Router } = require('express');
const { body, check } = require('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');

const { existeCategoriaId, existeCategoriaNombre, esAppValida } = require('../helpers/db-validators');

const { crearApp, obtenerApp, actualizarApp, borrarApp } = require('../controllers/applications');

const router = Router();
/**
 * {{url}}/api/categorias
 */
router.get('/', obtenerApp);

router.post('/', crearApp);

router.put('/:id', actualizarApp);

router.delete('/:id', borrarApp);

module.exports = router;