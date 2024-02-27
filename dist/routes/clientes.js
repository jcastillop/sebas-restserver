"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_1 = require("../controllers/clientes");
const router = (0, express_1.Router)();
router.post('/', [], clientes_1.clienteNuevo);
router.get('/', [], clientes_1.clienteObtener);
router.post('/buscar', [], clientes_1.clienteBuscarPorDocumento);
router.get('/listar', [], clientes_1.clienteListar);
router.put('/actualizar', [], clientes_1.clienteActualizar);
router.delete('/eliminar', [], clientes_1.clienteEliminar);
exports.default = router;
//# sourceMappingURL=clientes.js.map