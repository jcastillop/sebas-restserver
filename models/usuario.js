const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required:[true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE']
    },
    app:{
        type: String,
        required:true
    },    
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuarios', UsuarioSchema);