const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarArchivo } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarArchivo)

router.get('/:coleccion/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos    
], mostrarArchivo)

module.exports = router;