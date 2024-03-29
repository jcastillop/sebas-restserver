"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.body)('user')
        .notEmpty().withMessage('El campo usuario no puede estar vacío'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('El campo password no puede estar vacío')
        .isLength({ min: 4 }).withMessage('La contraseña debe tener como mínimo 4 caracteres')
        .isAlphanumeric().withMessage('solo estan permitidos caracteres alphanuméricos'),
    middlewares_1.validarCampos
], auth_1.login);
router.get('/', auth_1.validarTokenUsuario);
exports.default = router;
//# sourceMappingURL=auth.js.map