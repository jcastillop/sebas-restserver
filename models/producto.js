const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    application:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    },    
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    medida: {
        type: Schema.Types.ObjectId,
        ref:'Medida',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },    
    cantidad: {
        type: Number,
        default: 0
    },    
    codigo: {
        type: String,
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
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    descripcion: {
        type: String
    }, 
    disponible:{
        type: Boolean,
        default: true
    },       
    img: {
        type: String
    }
})

ProductoSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, estado, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema)