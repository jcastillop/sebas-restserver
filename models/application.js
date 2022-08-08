const {Schema, model} = require('mongoose');

const ApplicationSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre de la aplicacion es obligatorio']
    }
})

ApplicationSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model( 'Application', ApplicationSchema)