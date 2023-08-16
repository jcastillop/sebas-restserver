import { Schema, model } from "mongoose";
import { compare, hash, hashSync } from "bcrypt";
import constantes from "../helpers/constantes";

interface IUsuario extends Document{
    usuario: string;
    nombre: string;
    correo: string;
    password: string;
    img: string;
    rol: Schema.Types.ObjectId;
    aplicacion: Schema.Types.ObjectId;
    empresa: Schema.Types.ObjectId;
    estado: boolean;
    
}

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
    rol:{
        type: Schema.Types.ObjectId,
        ref:'Rol',
        required: true
    },
    aplicacion:{
        type: Schema.Types.ObjectId,
        ref:'Application',
        required: true
    },       
    empresa:{
        type: Schema.Types.ObjectId,
        ref:'Supplier',
        required: true
    },
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
