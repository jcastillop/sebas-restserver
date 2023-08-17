import { Schema, model } from "mongoose";
import { compare, hash, hashSync } from "bcrypt";
import constantes from "../helpers/constantes";
import { IUsuario, UsuarioModel } from "../interfaces";
import { ObjectId } from "mongodb";


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
    console.log("entramos al middleware");
    const user = this;
    if(!user.password) return;
    if (!user.isModified('password')) return;
    const hash = hashSync(user.password, constantes.SALT_WORK_FACTOR);
    user.password = hash
    return next();
});

UsuarioSchema.static('saveUsuario', function saveUsuario( usuario: IUsuario ) {
    return this.create(usuario);
});
UsuarioSchema.static('getUsuario', function getUsuario( id: string ) {
    return this.findById(new ObjectId(id));
});
UsuarioSchema.static('getUsuarios', function getUsuarios( aplicacion: Schema.Types.ObjectId, empresa: Schema.Types.ObjectId, skip: number, limit: number, estado: boolean ) {

    const parametros = { estado : true, empresa: empresa, aplicacion: aplicacion }

    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            //.populate([{ path: 'empresa', strictPopulate: false, select: 'nombre_comercial razon_social' }])
            .populate([{ path: 'empresa', strictPopulate: false }])    
            .populate([{ path: 'aplicacion', strictPopulate: false }])    
            .populate([{ path: 'rol', strictPopulate: false }])  
            .skip(Number(skip))
            .limit(Number(limit))
    ]); 

});
UsuarioSchema.static('updateUsuario', function updateUsuario( usuario: IUsuario ) {
    return this.updateOne(
        { "_id": usuario._id}, 
        { "$set": {
            "nombre":           usuario.nombre,
            "empresa":          usuario.empresa, 
            "aplicacion":       usuario.aplicacion,
            "rol":              usuario.rol,
            "correo":           usuario.correo
            } 
        }
    )
});
UsuarioSchema.static('deleteUsuario', function deleteUsuario( id: Schema.Types.ObjectId ) {
    return this.updateOne({ "_id": id}, { "estado": false})
});

UsuarioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const {__v, password, _id, ...data} = this.toObject();
    data.uid = _id;
    return data;
}

export default model<IUsuario, UsuarioModel>('Usuario', UsuarioSchema);
