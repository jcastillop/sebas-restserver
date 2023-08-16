"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../controllers/productos");
const router = (0, express_1.Router)();
router.post('/', productos_1.productoNuevo);
router.get('/', productos_1.productoObtener);
router.get('/listar', productos_1.productoListar);
router.post('/eliminar', productos_1.productoEliminar);
exports.default = router;
//# sourceMappingURL=productos.js.map