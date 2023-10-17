"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_1 = require("../controllers/roles");
const router = (0, express_1.Router)();
router.post('/', [], roles_1.rolNuevo);
router.get('/', [], roles_1.rolObtener);
router.get('/listar', [], roles_1.rolListar);
router.put('/actualizar', [], roles_1.rolActualizar);
router.delete('/eliminar', [], roles_1.rolEliminar);
//# sourceMappingURL=roles.js.map