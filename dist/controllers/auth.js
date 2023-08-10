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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const usuario_1 = __importDefault(require("../models/usuario"));
const generar_jwt_1 = __importDefault(require("../helpers/generar-jwt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ usuario: user })
            .populate("rols")
            .populate({
            path: "applications",
            populate: { path: 'suppliers' }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - usuario no existe'
            });
        }
        //Usuario activo
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - usuario inactivo'
            });
        }
        //Validar contrasena
        const isMatch = (0, bcrypt_1.compareSync)(password, (usuario === null || usuario === void 0 ? void 0 : usuario.password) || "");
        if (!isMatch) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password no coincide'
            });
        }
        //Generar Jwt
        const token = yield (0, generar_jwt_1.default)(usuario.id);
        return res.json({
            usuario,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map