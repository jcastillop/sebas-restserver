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
const AplicacionEmpresaSchema = new mongoose_1.Schema({
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
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
});
AplicacionEmpresaSchema.index({ aplicacion: 1, empresa: 1 }, { unique: true });
AplicacionEmpresaSchema.static('saveAplicacionEmpresa', function saveAplicacionEmpresa(aplicacion_empresa) {
    return this.create(aplicacion_empresa);
});
AplicacionEmpresaSchema.static('getAplicacionEmpresa', function getAplicacionEmpresa(aplicacion, empresa) {
    return this.findOne({ aplicacion, empresa });
});
AplicacionEmpresaSchema.static('getAplicacionesEmpresas', function getAplicacionesEmpresas(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            //.populate([{ path: 'empresa', strictPopulate: false, select: 'nombre_comercial razon_social' }])
            .populate([{ path: 'empresa', strictPopulate: false }])
            .populate([{ path: 'aplicacion', strictPopulate: false }])
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
AplicacionEmpresaSchema.static('updateAplicacionEmpresa', function updateAplicacionEmpresa(aplicacion_empresa) {
    return this.updateOne({ "_id": aplicacion_empresa._id }, { "$set": {
            "empresa": aplicacion_empresa.empresa,
            "aplicacion": aplicacion_empresa.aplicacion,
            "descripcion": aplicacion_empresa.descripcion
        }
    });
});
AplicacionEmpresaSchema.static('deleteAplicacionEmpresa', function deleteAplicacionEmpresa(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
AplicacionEmpresaSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('ApplicationSupplier', AplicacionEmpresaSchema);
//# sourceMappingURL=aplicacion_empresa.js.map