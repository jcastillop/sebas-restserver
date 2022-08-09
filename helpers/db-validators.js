const {Application, Categoria, Producto, Usuario} = require('../models')

const esApplicationValida = async(nombre = '') => {
    const existeApp = await Application.findOne({nombre});
    if(!existeApp){
        throw new Error(`El nombre de la app ${nombre} no esta registrado en BD`)
    }
}
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${correo} ya existe en la BD`)
    }
}
const existeUsuarioId = async(id) => {    
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe en la BD`)
    }
    
}
const existeCategoriaId = async(id) => {    
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id ${id} no existe en la BD`)
    }
    
}
const existeCategoriaNombre = async(nombre = '') => {    
    nombre = nombre.toUpperCase();
    const existeCategoria = await Categoria.findOne({nombre});
    if(existeCategoria){
        throw new Error(`La categoria ${nombre} ya existe en la BD`)
    }
    
}
const existeProductoId = async(id) => {    
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${id} no existe en la BD`)
    }
    
}
module.exports = {
    esApplicationValida,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeCategoriaNombre,
    existeProductoId
}