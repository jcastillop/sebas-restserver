import { Router } from 'express';
import { body } from 'express-validator';

import { productoNuevo, productoObtener, productoListar, productoEliminar, productoActualizar, productoListarCalientito } from '../controllers/productos';
import { validarCampos, validarJWT } from '../middlewares';
import { existeCodigoProducto, existeNombreProducto } from '../helpers';

const router = Router();

router.post('/', [
    validarJWT,
    body('empresa')
        .notEmpty()     .withMessage('El campo empresa no puede estar vacío')
        .isMongoId()    .withMessage('Envíe un ID de empresa válido'),
    body('aplicacion')
        .notEmpty()     .withMessage('El campo aplicacion no puede estar vacío')
        .isMongoId()    .withMessage('Envíe un ID de aplicacion válido'),
    body('nombre')
        .notEmpty()     .withMessage('El campo nombre no puede estar vacío')
        .custom( (codigo,{req}) => existeNombreProducto(codigo, req.body.empresa, req.body.aplicacion) ),        
    body('categoria')
        .notEmpty()     .withMessage('El campo categoria no puede estar vacío')
        .isMongoId(),        
    body('codigo')
        .custom( (codigo,{req}) => existeCodigoProducto(codigo, req.body.empresa, req.body.aplicacion) ),
    body('descripcion')
        .notEmpty()     .withMessage('El campo descripcion no puede estar vacío'),
    validarCampos
],
productoNuevo);

router.get('/',        productoObtener);
router.get('/listar',        productoListar);
router.get('/listar/calientito',        [
    validarJWT,
    validarCampos
], productoListarCalientito);
router.post('/eliminar',        productoEliminar);
router.post('/actualizar',        productoActualizar);

export default router;