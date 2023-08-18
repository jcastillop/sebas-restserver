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
exports.usuarioEliminar = exports.usuarioActualizar = exports.usuarioListar = exports.usuarioObtener = exports.usuarioNuevo = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const usuarioNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, nombre, correo, password, rol, aplicacion, empresa } = req.body;
        const user = {
            usuario,
            nombre,
            correo,
            password,
            rol,
            aplicacion,
            empresa
        };
        const usuarioSaved = yield models_1.Usuario.saveUsuario(user);
        if (usuarioSaved) {
            res.json({
                messsage: 'usuarioNuevo - Usuario almacenado correctamente',
                usuario: usuarioSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'usuarioNuevo - Ocurrió un error durante la creación del usuario',
                usuario: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            producto: null,
            hasError: true
        });
    }
});
exports.usuarioNuevo = usuarioNuevo;
const usuarioObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const usuario = yield models_1.Usuario.getUsuario(id);
        if (usuario) {
            res.json({
                messsage: 'usuarioObtener - Usuario encontrado',
                usuario: usuario,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'usuarioObtener - Ocurrió un error durante la busqueda del Usuario',
                usuario: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            usuario: null,
            hasError: true
        });
    }
});
exports.usuarioObtener = usuarioObtener;
const usuarioListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresa, aplicacion, estado = true, limite = 5, desde = 0 } = req.body;
        const [total, usuario] = yield models_1.Usuario.getUsuarios(aplicacion, empresa, desde, limite, estado);
        if (usuario) {
            res.json({
                messsage: 'usuarioListar - Usuarios encontrados',
                total: total,
                usuario: usuario,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'usuarioListar - Ocurrió un error durante la busqueda del Usuarios',
                total: 0,
                usuario: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            usuario: null,
            hasError: true
        });
    }
});
exports.usuarioListar = usuarioListar;
const usuarioActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, correo, rol, aplicacion, empresa } = req.body;
        const user = {
            _id: id,
            nombre,
            correo,
            rol,
            aplicacion,
            empresa
        };
        const service = yield models_1.Usuario.updateUsuario(user);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'usuarioActualizar - Usuario actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'usuarioActualizar - Ocurrió un error durante la actualizacion del Usuario',
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
exports.usuarioActualizar = usuarioActualizar;
const usuarioEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Usuario.deleteUsuario(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'usuarioEliminar - Usuario eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'usuarioEliminar - Ocurrió un error durante la eliminacion del Usuario',
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
exports.usuarioEliminar = usuarioEliminar;
//# sourceMappingURL=usuarios.js.map