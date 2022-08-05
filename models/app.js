const {Schema, model} = require('mongoose');

const AppSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
})

module.exports = model( 'App', AppSchema)