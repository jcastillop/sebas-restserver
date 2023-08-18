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
const EmpresaSchema = new mongoose_1.Schema({
    nombre_comercial: {
        type: String,
        required: [true, 'El nombre comercial de la empresa es obligatorio']
    },
    razon_social: {
        type: String,
        required: [true, 'La razon socialde la empresa es obligatorio']
    },
    ruc: {
        type: String,
        required: [true, 'El RUC de la empresa es obligatorio'],
        unique: true
    },
    ubigeo: {
        type: String
    },
    direccion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});
EmpresaSchema.static('saveEmpresa', function saveEmpresa(empresa) {
    return this.create(empresa);
});
EmpresaSchema.static('getEmpresa', function getEmpresa(id) {
    return this.findById(id);
});
EmpresaSchema.static('getEmpresas', function getEmpresas(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
EmpresaSchema.static('updateEmpresa', function updateEmpresa(empresa) {
    return this.updateOne({ "_id": empresa._id }, { "$set": {
            "nombre_comercial": empresa.nombre_comercial,
            "razon_social": empresa.razon_social,
            "ruc": empresa.ruc,
            "ubigeo": empresa.ubigeo,
            "direccion": empresa.direccion
        }
    });
});
EmpresaSchema.static('deleteEmpresa', function deleteEmpresa(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
EmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Supplier', EmpresaSchema);
//# sourceMappingURL=empresa.js.map