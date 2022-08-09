const {Schema, model} = require('mongoose');

const MedidaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    codigo: {
        type: String,
        required: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },        
})

MedidaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Medida', MedidaSchema)