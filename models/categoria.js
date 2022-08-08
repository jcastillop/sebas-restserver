const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
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
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, estado, ...categoria} = this.toObject();
    return categoria;
}

module.exports = model( 'Categoria', CategoriaSchema)