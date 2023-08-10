import { Schema, model } from "mongoose";
import { IUsuario } from "../interfaces";
import { compare, hash, hashSync } from "bcrypt";
import constantes from "../helpers/constantes";

const UsuarioSchema = new Schema<IUsuario>({
    usuario:{
        type: String,
        required:[true, 'El usuario es obligatorio'],
        unique:true
    },    
    nombre:{
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        
    },
    password:{
        type: String,
        required:[true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    rols:[{
        type: Schema.Types.ObjectId,
        ref:'Rol',
        required: true
    }],
    applications:[{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    }],       
    estado:{
        type: Boolean,
        default:true
    }
});

UsuarioSchema.pre('save', function(next): void {
    const user = this;
    if (!user.isModified('password')) return;
    const hash = hashSync(user.password, constantes.SALT_WORK_FACTOR);
    user.password = hash
    return next();
});

UsuarioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, password, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model('Usuario', UsuarioSchema);
