"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categorias_1 = require("../controllers/categorias");
const router = (0, express_1.Router)();
router.post('/', categorias_1.categoriaNuevo);
router.get('/', categorias_1.categoriaListar);
router.get('/:id', categorias_1.categoriaObtener);
router.put('/:id', categorias_1.categoriaActualizar);
router.delete('/:id', categorias_1.categoriaBorrar);
exports.default = router;
//# sourceMappingURL=categorias.js.map