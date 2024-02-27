"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const ClienteSchema = new mongoose_1.Schema({
    tipo_documento: {
        type: Number,
        required: [true, 'El tipo de documento es obligatorio']
    },
    numero_documento: {
        type: String,
        required: [true, 'El numero de documento es obligatorio']
    },
    nombre_comercial: {
        type: String
    },
    razon_social: {
        type: String,
        required: [true, 'La razon socialde la empresa es obligatorio']
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
ClienteSchema.static('saveCliente', function saveCliente(cliente, id_empresa) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.create(cliente);
    });
});
ClienteSchema.static('getCliente', function getCliente(id) {
    return this.findById(id);
});
ClienteSchema.static('getClienteByDocument', function getCliente(valor) {
    return this.findOne({ numero_documento: valor });
});
ClienteSchema.static('getClientes', function getClientes(skip, limit, estado) {
    const parametros = { estado: estado };
    return Promise.all([
        this.countDocuments(parametros),
        this.find(parametros)
            .skip(Number(skip))
            .limit(Number(limit))
    ]);
});
ClienteSchema.static('updateCliente', function updateCliente(cliente) {
    return this.updateOne({ "_id": cliente._id }, { "$set": {
            "tipo_documento": cliente.tipo_documento,
            "numero_documento": cliente.numero_documento,
            "nombre_comercial": cliente.nombre_comercial,
            "razon_social": cliente.razon_social,
            "ubigeo": cliente.ubigeo,
            "direccion": cliente.direccion
        }
    });
});
ClienteSchema.static('deleteCliente', function deleteCliente(id) {
    return this.updateOne({ "_id": id }, { "estado": false });
});
ClienteSchema.methods.toJSON = function () {
    //tiene que ser una funcion normal
    const _a = this.toObject(), { __v, _id } = _a, data = __rest(_a, ["__v", "_id"]);
    data.uid = _id;
    return data;
};
exports.default = (0, mongoose_1.model)('Customer', ClienteSchema);
//# sourceMappingURL=cliente.js.map