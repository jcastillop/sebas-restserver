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
exports.empresaEliminar = exports.empresaActualizar = exports.empresaListar = exports.empresaObtener = exports.empresaNuevo = void 0;
const helpers_1 = require("../helpers");
const models_1 = require("../models");
const empresaNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_comercial, razon_social, ruc, ubigeo, direccion } = req.body;
        const empresa = {
            nombre_comercial,
            razon_social,
            ruc,
            ubigeo,
            direccion
        };
        const empresaSaved = yield models_1.Empresa.saveEmpresa(empresa);
        if (empresaSaved) {
            res.json({
                messsage: 'empresaNuevo - Empresa almacenada correctamente',
                empresa: empresaSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'empresaNuevo - Ocurrió un error durante la creación de la Empresa',
                empresa: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            empresa: null,
            hasError: true
        });
    }
});
exports.empresaNuevo = empresaNuevo;
const empresaObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const empresa = yield models_1.Empresa.getEmpresa(id);
        if (empresa) {
            res.json({
                messsage: 'empresaObtener - Empresa encontrada',
                empresa: empresa,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'empresaObtener - Ocurrió un error durante la busqueda de la Empresa',
                empresa: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            empresa: null,
            hasError: true
        });
    }
});
exports.empresaObtener = empresaObtener;
const empresaListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        const [total, empresa] = yield models_1.Empresa.getEmpresas(desde, limite, estado);
        if (empresa) {
            res.json({
                messsage: 'empresaListar - Empresas encontradas',
                total: total,
                empresa: empresa,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'empresaListar - Ocurrió un error durante la busqueda de Empresas',
                total: 0,
                empresa: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            empresa: null,
            hasError: true
        });
    }
});
exports.empresaListar = empresaListar;
const empresaActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre_comercial, razon_social, ruc, ubigeo, direccion } = req.body;
        const empresa = {
            _id: id,
            nombre_comercial,
            razon_social,
            ruc,
            ubigeo,
            direccion
        };
        const service = yield models_1.Empresa.updateEmpresa(empresa);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'empresaActualizar - Empresa actualizada',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'empresaActualizar - Ocurrió un error durante la actualizacion de la Empresa',
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
exports.empresaActualizar = empresaActualizar;
const empresaEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Empresa.deleteEmpresa(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'empresaEliminar - Empresa eliminada',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'empresaEliminar - Ocurrió un error durante la eliminacion de la Empresa',
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
exports.empresaEliminar = empresaEliminar;
//# sourceMappingURL=empresas.js.map