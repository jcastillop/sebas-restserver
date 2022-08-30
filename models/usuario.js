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
        enum:['ADMIN_ROLE', 'USER_ROLE', 'SUPERV_ROLE']
    },
    application:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
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
    const {__v, password, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

module.exports = model('Usuario', UsuarioSchema);