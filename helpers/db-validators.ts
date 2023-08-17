import { Schema, model } from "mongoose";
import {Aplicacion, Usuario} from "../models";

export const esApplicationValida = async(id = '') => {
    console.log(`entro al custom validation ${id}`)
    const existeApp = await Aplicacion.findById(id);
    if(!existeApp){
        throw new Error(`El identificador de la aplicacion ${id} no existe en la BD`)
    }
}

export const existeUsuarioNombre = async(usuario = '') => {
    const existeUsuario = await Usuario.findOne({usuario});
    if(existeUsuario){
        throw new Error(`El usuario ${usuario} ya existe en la BD`)
    }
}

export const existeUsuarioId = async(id: Schema.Types.ObjectId) => {    
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe en la BD`)
    }
    
}

export const existeCodigoProducto = async(codigo: string, empresa: Schema.Types.ObjectId, aplicacion: Schema.Types.ObjectId) => {    
    console.log(empresa, aplicacion);
    const existeProducto = await Usuario.find({ codigo, empresa, aplicacion});
    if(existeProducto){
        throw new Error(`El codigo ${codigo} de producto ya existe`)
    } 
}

export const existeNombreProducto = async(nombre: string, empresa: Schema.Types.ObjectId, aplicacion: Schema.Types.ObjectId) => {    
    console.log(empresa, aplicacion);
    const existeProducto = await Usuario.find({ nombre, empresa, aplicacion});
    if(existeProducto){
        throw new Error(`El nombre ${nombre} de producto ya existe`)
    } 
}
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