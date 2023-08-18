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
exports.rolEliminar = exports.rolActualizar = exports.rolListar = exports.rolObtener = exports.rolNuevo = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const rolNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        const rol = {
            nombre,
            descripcion
        };
        const rolSaved = yield models_1.Rol.saveRol(rol);
        if (rolSaved) {
            res.json({
                messsage: 'rolNuevo - Rol almacenada correctamente',
                rol: rolSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'rolNuevo - Ocurrió un error durante la creación del Rol',
                rol: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            rol: null,
            hasError: true
        });
    }
});
exports.rolNuevo = rolNuevo;
const rolObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const rol = yield models_1.Rol.getRol(id);
        if (rol) {
            res.json({
                messsage: 'rolObtener - Rol encontrado',
                rol: rol,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'rolObtener - Ocurrió un error durante la busqueda del Rol',
                rol: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            rol: null,
            hasError: true
        });
    }
});
exports.rolObtener = rolObtener;
const rolListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        const [total, rol] = yield models_1.Rol.getRoles(desde, limite, estado);
        if (rol) {
            res.json({
                messsage: 'rolListar - Roles encontradas',
                total: total,
                rol: rol,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'rolListar - Ocurrió un error durante la busqueda de Roles',
                total: 0,
                rol: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            rol: null,
            hasError: true
        });
    }
});
exports.rolListar = rolListar;
const rolActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, descripcion } = req.body;
        const rol = {
            _id: id,
            nombre,
            descripcion
        };
        const service = yield models_1.Rol.updateRol(rol);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'rolActualizar - Rol actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'rolActualizar - Ocurrió un error durante la actualizacion del Rol',
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
exports.rolActualizar = rolActualizar;
const rolEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Rol.deleteRol(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'rolEliminar - Rol eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'rolEliminar - Ocurrió un error durante la eliminacion del Rol',
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
exports.rolEliminar = rolEliminar;
//# sourceMappingURL=roles.js.map