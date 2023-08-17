"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const constantes_1 = __importDefault(require("../helpers/constantes"));
const mongodb_1 = require("mongodb");
const UsuarioSchema = new mongoose_1.Schema({
    usuario: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    },
    aplicacion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});
UsuarioSchema.pre('save', function (next) {
    console.log("entramos al middleware");
    const user = this;
    if (!user.password)
        return;
    if (!user.isModified('password'))
        return;
    const hash = (0, bcrypt_1.hashSync)(user.password, constantes_1.default.SALT_WORK_FACTOR);
    user.password = hash;
    return next();
});
UsuarioSchema.static('saveUsuario', function saveUsuario(usuario) {
    return this.create(usuario);
});
UsuarioSchema.static('getUsuario', function getUsuario(id) {
    return this.findById(new mongodb_1.ObjectId(id));
});
UsuarioSchema.static('getUsuarios', function getUsuarios(aplicacion, empresa, skip, limit, estado) {
    const parametros = { estado: true, empresa: empresa, aplicacion: aplicacion };
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
UsuarioSchema.static('updateUsuario', function updateUsuario(usuario) {
    return this.updateOne({ "_id": usuario._id }, { "$set": {
            "nombre": usuario.nombre,
            "empresa": usuario.empresa,
            "aplicacion": usuario.aplicacion,
            "rol": usuario.rol,
            "correo": usuario.correo
        }
    });
});
UsuarioSchema.static('deleteUsuario', function deleteUsuario(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
UsuarioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, password, _id } = _a, data = __rest(_a, ["__v", "password", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map