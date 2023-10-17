"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioProductoEliminar = exports.servicioProductoActualizar = exports.servicioProductoListar = exports.servicioProductoObtener = exports.servicioProductoNuevo = exports.servicioEliminar = exports.servicioActualizar = exports.servicioListar = exports.servicioObtener = exports.servicioNuevo = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const servicioNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { codigo, nombre, descripcion, aplicacion, empresa } = req.body;
        const servicio = {
            codigo,
            nombre,
            descripcion,
            aplicacion,
            empresa
        };
        const servicioSaved = yield models_1.Servicio.saveServicio(servicio);
        if (servicioSaved) {
            res.json({
                messsage: 'servicioNuevo - Servicio almacenado correctamente',
                servicio: servicioSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioNuevo - Ocurrió un error durante la creación del Servicio',
                servicio: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            servicio: null,
            hasError: true
        });
    }
});
exports.servicioNuevo = servicioNuevo;
const servicioObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const servicio = yield models_1.Servicio.getServicio(id);
        if (servicio) {
            res.json({
                messsage: 'servicioObtener - Servicio encontrado',
                servicio: servicio,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioObtener - Ocurrió un error durante la busqueda del Servicio',
                servicio: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            servicio: null,
            hasError: true
        });
    }
});
exports.servicioObtener = servicioObtener;
const servicioListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        const [total, servicio] = yield models_1.Servicio.getServicios(desde, limite, estado);
        if (servicio) {
            res.json({
                messsage: 'servicioListar - Servicios encontradas',
                total: total,
                servicio: servicio,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioListar - Ocurrió un error durante la busqueda de Servicios',
                total: 0,
                servicio: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            servicio: null,
            hasError: true
        });
    }
});
exports.servicioListar = servicioListar;
const servicioActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, codigo, nombre, descripcion, aplicacion, empresa } = req.body;
        const servicio = {
            _id: id,
            codigo,
            nombre,
            descripcion,
            aplicacion,
            empresa
        };
        const service = yield models_1.Servicio.updateServicio(servicio);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'servicioActualizar - Servicio actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioActualizar - Ocurrió un error durante la actualizacion del Servicio',
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            hasError: false
        });
    }
});
exports.servicioActualizar = servicioActualizar;
const servicioEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Servicio.deleteServicio(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'servicioEliminar - Servicio eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioEliminar - Ocurrió un error durante la eliminacion del Servicio',
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            hasError: true
        });
    }
});
exports.servicioEliminar = servicioEliminar;
const servicioProductoNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { servicio, producto, precio, cantidad, descripcion } = req.body;
        const servicio_producto = {
            servicio,
            producto,
            precio,
            cantidad,
            descripcion
        };
        const servicioProducto = yield models_1.ServicioProducto.saveServicioProducto(servicio_producto);
        if (servicioProducto) {
            res.json({
                messsage: 'servicioProductoNuevo - ServicioProducto almacenado correctamente',
                servicioProducto: servicioProducto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioProductoNuevo - Ocurrió un error durante la creación del ServicioProducto',
                servicioProducto: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            servicioProducto: null,
            hasError: true
        });
    }
});
exports.servicioProductoNuevo = servicioProductoNuevo;
const servicioProductoObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const servicioProducto = yield models_1.ServicioProducto.getServicioProducto(id);
        if (servicioProducto) {
            res.json({
                messsage: 'servicioProductoObtener - servicioProducto encontrado',
                servicioProducto: servicioProducto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioProductoObtener - Ocurrió un error durante la busqueda del servicioProducto',
                servicioProducto: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            servicio_producto: null,
            hasError: true
        });
    }
});
exports.servicioProductoObtener = servicioProductoObtener;
const servicioProductoListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { servicio, estado = true, limite = 5, desde = 0 } = req.body;
        const [total, servicioProducto] = yield models_1.ServicioProducto.getServiciosProductos(servicio, desde, limite, estado);
        if (servicioProducto) {
            res.json({
                messsage: 'servicioProductoListar - servicioProducto encontradas',
                total: total,
                servicioProducto: servicioProducto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioProductoListar - Ocurrió un error durante la busqueda de servicioProducto',
                total: 0,
                servicioProducto: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            servicio: null,
            hasError: true
        });
    }
});
exports.servicioProductoListar = servicioProductoListar;
const servicioProductoActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, precio, cantidad, descripcion } = req.body;
        const servicio_producto = {
            _id: id,
            precio,
            cantidad,
            descripcion
        };
        const service = yield models_1.ServicioProducto.updateServicioProducto(servicio_producto);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'servicioProductoActualizar - ServicioProducto actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioProductoActualizar - Ocurrió un error durante la actualizacion del ServicioProducto',
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            hasError: false
        });
    }
});
exports.servicioProductoActualizar = servicioProductoActualizar;
const servicioProductoEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.ServicioProducto.deleteServicioProducto(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'servicioProductoEliminar - ServicioProducto eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'servicioProductoEliminar - Ocurrió un error durante la eliminacion del ServicioProducto',
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            hasError: true
        });
    }
});
exports.servicioProductoEliminar = servicioProductoEliminar;
//# sourceMappingURL=servicios.js.map