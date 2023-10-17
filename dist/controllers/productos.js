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
exports.productoEliminar = exports.productoActualizar = exports.productoListarCalientito = exports.productoListar = exports.productoObtener = exports.productoNuevo = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const productoNuevo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, empresa, aplicacion, categoria, codigo, codigo_sunat, descuento, descripcion, precio_unitario, unidad_medida, valor_unitario } = req.body;
        const producto = {
            nombre,
            empresa,
            aplicacion,
            categoria,
            codigo,
            codigo_sunat,
            descuento,
            descripcion,
            precio_unitario,
            unidad_medida,
            valor_unitario
        };
        const productoSaved = yield models_1.Producto.saveProducto(producto);
        if (productoSaved) {
            res.json({
                messsage: 'productoNuevo - Producto almacenado correctamente',
                producto: productoSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoNuevo - Ocurrió un error durante la creación del producto',
                producto: null,
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
exports.productoNuevo = productoNuevo;
const productoObtener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const producto = yield models_1.Producto.getProducto(id);
        if (producto) {
            res.json({
                messsage: 'productoObtener - Producto encontrado',
                producto: producto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoObtener - Ocurrió un error durante la busqueda del producto',
                producto: null,
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
exports.productoObtener = productoObtener;
const productoListar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresa, aplicacion, estado = true, limite = 5, desde = 0 } = req.body;
        const [total, producto] = yield models_1.Producto.getProductos(aplicacion, empresa, desde, limite, estado);
        if (producto) {
            res.json({
                messsage: 'productoListar - Productos encontrados',
                total: total,
                producto: producto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoListar - Ocurrió un error durante la busqueda del productos',
                total: 0,
                producto: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            producto: null,
            hasError: true
        });
    }
});
exports.productoListar = productoListar;
const productoListarCalientito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado = true, limite = 5, desde = 0 } = req.body;
        const categoria = req.query.categoria;
        const [total, producto] = yield models_1.Producto.getProductosCalientito(helpers_1.appVars.aplicacion, helpers_1.appVars.empresa, categoria, desde, limite, estado);
        if (producto) {
            res.json({
                messsage: 'productoListarAcequitos - Productos encontrados',
                total: total,
                producto: producto,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoListarAcequitos - Ocurrió un error durante la busqueda del productos',
                total: 0,
                producto: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            producto: null,
            hasError: true
        });
    }
});
exports.productoListarCalientito = productoListarCalientito;
const productoActualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, empresa, aplicacion, categoria, codigo, codigo_sunat, descuento, descripcion, precio_unitario, unidad_medida, valor_unitario } = req.body;
        const producto = {
            _id: id,
            nombre,
            empresa,
            aplicacion,
            categoria,
            codigo,
            codigo_sunat,
            descuento,
            descripcion,
            precio_unitario,
            unidad_medida,
            valor_unitario
        };
        const service = yield models_1.Producto.updateProducto(producto);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'productoActualizar - Producto actualizado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoActualizar - Ocurrió un error durante la actualizacion del producto',
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
exports.productoActualizar = productoActualizar;
const productoEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Producto.deleteProducto(id);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'productoEliminar - Producto eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoEliminar - Ocurrió un error durante la eliminacion del producto',
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
exports.productoEliminar = productoEliminar;
//# sourceMappingURL=productos.js.map