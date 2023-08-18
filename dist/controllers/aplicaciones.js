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
exports.aplicacionEliminar = exports.aplicacionActualizar = exports.aplicacionListar = exports.aplicacionObtener = exports.aplicacionNuevo = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const aplicacionNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        const aplicacion = {
            nombre,
            descripcion
        };
        const aplicacionSaved = yield models_1.Aplicacion.saveAplicacion(aplicacion);
        if (aplicacionSaved) {
            res.json({
                messsage: 'aplicacionNuevo - Aplicacion almacenado correctamente',
                aplicacion: aplicacionSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'aplicacionNuevo - Ocurrió un error durante la creación de la Aplicacion',
                aplicacion: null,
                hasError: true
            });
        }
    }
    catch (error) {
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            aplicacion: null,
            hasError: true
        });
    }
});
exports.aplicacionNuevo = aplicacionNuevo;
const aplicacionObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const aplicacion = yield models_1.Aplicacion.getAplicacion(id);
        if (aplicacion) {
            res.json({
                messsage: 'aplicacionObtener - Aplicacion encontrado',
                aplicacion: aplicacion,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'aplicacionObtener - Ocurrió un error durante la busqueda de la Aplicacion',
                aplicacion: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            aplicacion: null,
            hasError: true
        });
    }
});
exports.aplicacionObtener = aplicacionObtener;
const aplicacionListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        const [total, aplicacion] = yield models_1.Aplicacion.getAplicaciones(desde, limite, estado);
        if (aplicacion) {
            res.json({
                messsage: 'aplicacionListar - Aplicaciones encontradas',
                total: total,
                aplicacion: aplicacion,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'aplicacionListar - Ocurrió un error durante la busqueda de Aplicaciones',
                total: 0,
                aplicacion: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            aplicacion: null,
            hasError: true
        });
    }
});
exports.aplicacionListar = aplicacionListar;
const aplicacionActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, descripcion } = req.body;
        const aplicacion = {
            _id: id,
            nombre,
            descripcion
        };
        const service = yield models_1.Aplicacion.updateAplicacion(aplicacion);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'aplicacionActualizar - Aplicacion actualizada',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'aplicacionActualizar - Ocurrió un error durante la actualizacion de la Aplicacion',
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
exports.aplicacionActualizar = aplicacionActualizar;
const aplicacionEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const aplicacion = yield models_1.Aplicacion.deleteAplicacion(id);
        if (aplicacion.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'aplicacionEliminar - Aplicacion eliminada',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'aplicacionEliminar - Ocurrió un error durante la eliminacion de la Aplicacion',
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
exports.aplicacionEliminar = aplicacionEliminar;
//# sourceMappingURL=aplicaciones.js.map