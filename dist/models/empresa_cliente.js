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
const EmpresaClienteSchema = new mongoose_1.Schema({
    empresa: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    cliente: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
});
EmpresaClienteSchema.index({ empresa: 1, cliente: 1 }, { unique: true });
EmpresaClienteSchema.static('saveEmpresaCliente', function saveEmpresaCliente(empresa_cliente) {
    return this.create(empresa_cliente);
});
EmpresaClienteSchema.static('getEmpresaCliente', function getEmpresaCliente(empresa, cliente) {
    return this.findOne({ empresa, cliente });
});
EmpresaClienteSchema.static('getEmpresasClientes', function getEmpresasClientes(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .populate([{ path: 'empresa', strictPopulate: false }])
            .populate([{ path: 'cliente', strictPopulate: false }])
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
EmpresaClienteSchema.static('updateEmpresasClientes', function updateEmpresasClientes(empresa_cliente) {
    return this.updateOne({ "_id": empresa_cliente._id }, { "$set": {
            "empresa": empresa_cliente.empresa,
            "cliente": empresa_cliente.cliente
        }
    });
});
EmpresaClienteSchema.static('deleteEmpresasClientes', function deleteEmpresasClientes(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
EmpresaClienteSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('SupplierCustomer', EmpresaClienteSchema);
//# sourceMappingURL=empresa_cliente.js.map