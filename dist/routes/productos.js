"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productos_1 = require("../controllers/productos");
const middlewares_1 = require("../middlewares");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.body)('empresa')
        .notEmpty().withMessage('El campo empresa no puede estar vacío')
        .isMongoId().withMessage('Envíe un ID de empresa válido'),
    (0, express_validator_1.body)('aplicacion')
        .notEmpty().withMessage('El campo aplicacion no puede estar vacío')
        .isMongoId().withMessage('Envíe un ID de aplicacion válido'),
    (0, express_validator_1.body)('nombre')
        .notEmpty().withMessage('El campo nombre no puede estar vacío')
        .custom((codigo, { req }) => (0, helpers_1.existeNombreProducto)(codigo, req.body.empresa, req.body.aplicacion)),
    (0, express_validator_1.body)('categoria')
        .notEmpty().withMessage('El campo categoria no puede estar vacío')
        .isMongoId(),
    (0, express_validator_1.body)('codigo')
        .custom((codigo, { req }) => (0, helpers_1.existeCodigoProducto)(codigo, req.body.empresa, req.body.aplicacion)),
    (0, express_validator_1.body)('descripcion')
        .notEmpty().withMessage('El campo descripcion no puede estar vacío'),
    middlewares_1.validarCampos
], productos_1.productoNuevo);
router.get('/', productos_1.productoObtener);
router.get('/listar', productos_1.productoListar);
router.post('/eliminar', productos_1.productoEliminar);
router.post('/actualizar', productos_1.productoActualizar);
exports.default = router;
//# sourceMappingURL=productos.js.map