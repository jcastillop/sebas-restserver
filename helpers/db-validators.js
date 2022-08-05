const App = require('../models/app')
const Usuario = require('../models/usuario')

const esAppValida = async(nombre = '') => {
    console.log('Nombre de la app')
    console.log(nombre)
    const existeApp = await App.findOne({nombre});
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
module.exports = {
    esAppValida,
    emailExiste,
    existeUsuarioId
}