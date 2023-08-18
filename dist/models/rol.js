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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RolSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion del rol es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
});
RolSchema.static('saveRol', function saveRol(rol) {
    return this.create(rol);
});
RolSchema.static('getRol', function getRol(id) {
    return this.findById(id);
});
RolSchema.static('getRoles', function getRoles(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
RolSchema.static('updateRol', function updateRol(rol) {
    return this.updateOne({ "_id": rol._id }, { "$set": {
            "nombre": rol.nombre,
            "descripcion": rol.descripcion
        }
    });
});
RolSchema.static('deleteRol', function deleteRol(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
RolSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
RolSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Rol', RolSchema);
//# sourceMappingURL=rol.js.map