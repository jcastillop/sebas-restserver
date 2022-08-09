const { Router } = require('express');

const { validarJWT, validarCampos } = require('../middlewares');

const { buscar } = require('../controllers/buscar');

const router = Router();


router.get('/:coleccion/:termino', [
    validarJWT, validarCampos
], buscar )




module.exports = router;