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
    const user = this;
    if (!user.isModified('password'))
        return;
    const hash = (0, bcrypt_1.hashSync)(user.password, constantes_1.default.SALT_WORK_FACTOR);
    user.password = hash;
    return next();
});
UsuarioSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, password, _id } = _a, data = __rest(_a, ["__v", "password", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map