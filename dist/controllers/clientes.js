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
exports.clienteActualizar = exports.clienteListar = exports.clienteNuevo = void 0;
const models_1 = require("../models");
const clienteNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion } = req.body;
        const clienteSaved = new models_1.Cliente({ tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion });
        if (clienteSaved) {
            res.json({
                messsage: 'clienteNuevo - Cliente almacenado correctamente',
                cliente: clienteSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteNuevo - Ocurrió un error durante la creación del cliente',
                cliente: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            cliente: null,
            hasError: true
        });
    }
});
exports.clienteNuevo = clienteNuevo;
const clienteListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const { empresa } = req.body;
        var parametros = {};
        parametros = { estado: true };
        if (empresa) {
            parametros = { estado: true, empresa: empresa };
        }
        const [total, clientes] = yield Promise.all([
            models_1.Cliente.countDocuments(parametros),
            models_1.Cliente.find(parametros)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.json({
            total,
            clientes
        });
    }
    catch (error) {
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            hasError: true
        });
    }
});
exports.clienteListar = clienteListar;
const clienteActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion } = req.body;
        const clienteSaved = new models_1.Cliente({ tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion });
        if (clienteSaved) {
            res.json({
                messsage: 'clienteNuevo - Cliente almacenado correctamente',
                cliente: clienteSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteNuevo - Ocurrió un error durante la creación del cliente',
                cliente: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            cliente: null,
            hasError: true
        });
    }
});
exports.clienteActualizar = clienteActualizar;
//# sourceMappingURL=clientes.js.map