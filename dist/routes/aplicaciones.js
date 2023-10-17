"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aplicaciones_1 = require("../controllers/aplicaciones");
const router = (0, express_1.Router)();
router.post('/', [], aplicaciones_1.aplicacionNuevo);
router.get('/', [], aplicaciones_1.aplicacionObtener);
router.get('/listar', [], aplicaciones_1.aplicacionListar);
router.put('/actualizar', [], aplicaciones_1.aplicacionActualizar);
router.delete('/eliminar', [], aplicaciones_1.aplicacionEliminar);
//# sourceMappingURL=aplicaciones.js.map