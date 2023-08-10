"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.body)('usuario')
        .notEmpty().withMessage('El campo usuario no puede estar vacío')
        .custom(val => (0, db_validators_1.existeUsuarioNombre)(val)),
    (0, express_validator_1.body)('nombre')
        .notEmpty().withMessage('El campo nombre no puede estar vacío'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('El campo password no puede estar vacío'),
    (0, express_validator_1.body)('rol')
        .notEmpty().withMessage('El campo password no puede estar vacío'),
    (0, express_validator_1.body)('application')
        .isMongoId().withMessage('Envíe un ID válido')
        .custom(val => (0, db_validators_1.esApplicationValida)(val)),
    middlewares_1.validarCampos
], usuarios_1.usuarioNuevo);
// router.get('/',         getUsuarios);
// router.get('/:id',      getUsuario);
// router.put('/:id',      putUsuario);
// router.delete('/:id',   deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map