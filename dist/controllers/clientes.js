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
exports.clienteEliminar = exports.clienteActualizar = exports.clienteListar = exports.clienteBuscarPorDocumento = exports.clienteObtener = exports.clienteNuevo = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const clienteNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_empresa, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion } = req.body;
        const cliente = {
            tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion
        };
        const clienteSaved = yield models_1.Cliente.saveCliente(cliente);
        if (clienteSaved) {
            //clienteSaved.id
            const empresa_cliente = {
                empresa: id_empresa,
                cliente: clienteSaved.id,
            };
            const empresaClienteSaved = yield models_1.EmpresaCliente.saveEmpresaCliente(empresa_cliente);
            if (empresaClienteSaved) {
                res.json({
                    messsage: 'clienteNuevo - Cliente almacenado correctamente',
                    cliente: clienteSaved,
                    hasError: false
                });
            }
            else {
                res.json({
                    messsage: 'EmpresaClienteNuevo - Ocurrió un error durante la creación de la EmpresaCliente',
                    cliente: clienteSaved,
                    hasError: false
                });
            }
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
const clienteObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const cliente = yield models_1.Cliente.getCliente(id);
        if (cliente) {
            res.json({
                messsage: 'clienteObtener - Cliente encontrado',
                cliente: cliente,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteObtener - Ocurrió un error durante la busqueda del Cliente',
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
exports.clienteObtener = clienteObtener;
const clienteBuscarPorDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { valor } = req.body;
        const cliente = yield models_1.Cliente.getClienteByDocument(valor);
        if (cliente) {
            res.json({
                messsage: 'clienteObtener - Cliente encontrado',
                cliente: cliente,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteObtener - No se encontró cliente',
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
exports.clienteBuscarPorDocumento = clienteBuscarPorDocumento;
const clienteListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 10, desde = 0 } = req.body;
        const [total, cliente] = yield models_1.Cliente.getClientes(desde, limite, estado);
        if (cliente) {
            res.json({
                messsage: 'clienteListar - Clientes encontrados',
                total: total,
                cliente: cliente,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteListar - Ocurrió un error durante la busqueda de Clientes',
                total: 0,
                cliente: null,
                hasError: true
            });
        }
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
        const { id, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion } = req.body;
        const cliente = {
            _id: id, tipo_documento, numero_documento, nombre_comercial, razon_social, ubigeo, direccion
        };
        const service = yield models_1.Cliente.updateCliente(cliente);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'clienteActualizar - Cliente actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteActualizar - Ocurrió un error durante la actualizacion del Cliente',
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
const clienteEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Cliente.deleteCliente(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'clienteEliminar - Cliente eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'clienteEliminar - Ocurrió un error durante la eliminacion del Cliente',
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
exports.clienteEliminar = clienteEliminar;
//# sourceMappingURL=clientes.js.map