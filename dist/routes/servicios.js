"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicios_1 = require("../controllers/servicios");
const router = (0, express_1.Router)();
router.post('/', [], servicios_1.servicioNuevo);
router.get('/', [], servicios_1.servicioObtener);
router.get('/listar', [], servicios_1.servicioListar);
router.put('/actualizar', [], servicios_1.servicioActualizar);
router.delete('/eliminar', [], servicios_1.servicioEliminar);
router.post('/servicio/producto', [], servicios_1.servicioProductoNuevo);
router.get('/servicio/producto', [], servicios_1.servicioProductoObtener);
router.get('/servicio/producto/listar', [], servicios_1.servicioProductoListar);
router.put('/servicio/producto/actualizar', [], servicios_1.servicioProductoActualizar);
router.delete('/servicio/producto/eliminar', [], servicios_1.servicioProductoEliminar);
//# sourceMappingURL=servicios.js.map