"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validarJWT,
    (0, express_validator_1.body)('usuario')
        .notEmpty().withMessage('El campo usuario no puede estar vacío')
        .custom(val => (0, db_validators_1.existeUsuarioNombre)(val)),
    (0, express_validator_1.body)('nombre')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('El campo password no puede estar vacío'),
    (0, express_validator_1.body)('rol')
        .notEmpty().withMessage('El campo password no puede estar vacío')
        .isMongoId().withMessage('Envíe un ID de aplicacion válido'),
    (0, express_validator_1.body)('aplicacion')
        .notEmpty().withMessage('El campo empresa no puede estar vacío')
        .isMongoId().withMessage('Envíe un ID de aplicacion válido'),
    //.custom(val => esApplicationValida(val)),
    (0, express_validator_1.body)('empresa')
        .notEmpty().withMessage('El campo empresa no puede estar vacío')
        .isMongoId().withMessage('Envíe un ID de empresa válido'),
    middlewares_1.validarCampos
], usuarios_1.usuarioNuevo);
router.get('/', usuarios_1.usuarioObtener);
router.get('/listar', usuarios_1.usuarioListar);
router.post('/eliminar', [
    middlewares_1.validarJWT,
    middlewares_1.validarCampos
], usuarios_1.usuarioEliminar);
router.put('/actualizar', [
    middlewares_1.validarJWT,
    middlewares_1.validarCampos
], usuarios_1.usuarioActualizar);
exports.default = router;
//# sourceMappingURL=usuarios.js.map