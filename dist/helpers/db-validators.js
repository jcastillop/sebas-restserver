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
exports.existeNombreProducto = exports.existeCodigoProducto = exports.existeUsuarioId = exports.existeUsuarioNombre = exports.esApplicationValida = void 0;
const models_1 = require("../models");
const esApplicationValida = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`entro al custom validation ${id}`);
    const existeApp = yield models_1.Aplicacion.findById(id);
    if (!existeApp) {
        throw new Error(`El identificador de la aplicacion ${id} no existe en la BD`);
    }
});
exports.esApplicationValida = esApplicationValida;
const existeUsuarioNombre = (usuario = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield models_1.Usuario.findOne({ usuario });
    if (existeUsuario) {
        throw new Error(`El usuario ${usuario} ya existe en la BD`);
    }
});
exports.existeUsuarioNombre = existeUsuarioNombre;
const existeUsuarioId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield models_1.Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD`);
    }
});
exports.existeUsuarioId = existeUsuarioId;
const existeCodigoProducto = (codigo, empresa, aplicacion) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(empresa, aplicacion);
    const existeProducto = yield models_1.Producto.find({ codigo, empresa, aplicacion });
    if (existeProducto.length > 0) {
        throw new Error(`El codigo ${codigo} de producto ya existe`);
    }
});
exports.existeCodigoProducto = existeCodigoProducto;
const existeNombreProducto = (nombre, empresa, aplicacion) => __awaiter(void 0, void 0, void 0, function* () {
    const existeProducto = yield models_1.Producto.find({ nombre, empresa, aplicacion });
    console.log(nombre);
    console.log(existeProducto);
    if (existeProducto.length > 0) {
        throw new Error(`El nombre ${nombre} de producto ya existe`);
    }
});
exports.existeNombreProducto = existeNombreProducto;
// const existeCategoriaId = async(id) => {    
//     const existeCategoria = await Categoria.findById(id);
//     if(!existeCategoria){
//         throw new Error(`El id ${id} no existe en la BD`)
//     }
// }
// const existeCategoriaNombre = async(nombre = '') => {    
//     nombre = nombre.toUpperCase();
//     const existeCategoria = await Categoria.findOne({nombre});
//     if(existeCategoria){
//         throw new Error(`La categoria ${nombre} ya existe en la BD`)
//     }
// }
// const existeProductoId = async(id) => {    
//     const existeProducto = await Producto.findById(id);
//     if(!existeProducto){
//         throw new Error(`El id ${id} no existe en la BD`)
//     }
// }
/**
 * Validar colecciones permitidas
*/
// const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {
//     const incluida = colecciones.includes( coleccion );
//     if( !incluida ){
//         throw new Error(`La coleccion ${coleccion} no es permitida, ${ colecciones}`)
//     }
//     return true;
// }
//# sourceMappingURL=db-validators.js.map