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
exports.productoEliminar = exports.productoListar = exports.productoObtener = exports.productoNuevo = void 0;
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
                cliente: productoSaved,
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoNuevo - Ocurrió un error durante la creación del producto',
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
                cliente: null,
                hasError: true
            });
        }
    }
    catch (error) {
        //log4js( error, 'error');
        res.status(404).json({
            messsage: `Error no identificado ${error}`,
            total: 0,
            cliente: null,
            hasError: true
        });
    }
});
exports.productoListar = productoListar;
const productoEliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const service = yield models_1.Producto.deleteProducto(id);
        console.log(service.matchedCount);
        if (service.matchedCount == helpers_1.Constantes.MONGOOSE_UPDATE_SUCCESS) {
            res.json({
                messsage: 'productoEliminar - Producto eliminado',
                hasError: false
            });
        }
        else {
            res.json({
                messsage: 'productoEliminar - Ocurrió un error durante la eliminacion del producto',
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
exports.productoEliminar = productoEliminar;
//# sourceMappingURL=productos.js.map