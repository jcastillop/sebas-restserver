const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    app:{
        type: Schema.Types.ObjectId,
        ref:'App',
        required: true
    },    
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    unidad_medida: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    codigo: {
        type: String,
        unique: true,
        required: true
    },
    codigo_sunat: {
        type: String
    },
    valor_unitario: {
        type: Number,
        default: 0
    },
    precio_unitario: {
        type: Number,
        default: 0
    },
    descuento: {
        type: Number,
        default: 0
    },    
})

ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema)