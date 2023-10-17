"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresas_1 = require("../controllers/empresas");
const router = (0, express_1.Router)();
router.post('/', [], empresas_1.empresaNuevo);
router.get('/', [], empresas_1.empresaObtener);
router.get('/listar', [], empresas_1.empresaListar);
router.put('/actualizar', [], empresas_1.empresaActualizar);
router.delete('/eliminar', [], empresas_1.empresaEliminar);
//# sourceMappingURL=empresas.js.map