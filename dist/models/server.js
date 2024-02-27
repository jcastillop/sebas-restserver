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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../database/config"));
const auth_1 = __importDefault(require("../routes/auth"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const clientes_1 = __importDefault(require("../routes/clientes"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const productos_1 = __importDefault(require("../routes/productos"));
const helpers_1 = require("../helpers");
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            clientes: '/api/clientes',
        };
        this.app = (0, express_1.default)();
        this.port = '80';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, config_1.default)();
                console.log('database on lines');
            }
            catch (error) {
            }
        });
    }
    logger(request, response, next) {
        (0, helpers_1.Log4js)(`${request.method} ${request.url} ${request.hostname}`);
        var res_value = request.method === "GET" ? request.query : request.body;
        (0, helpers_1.Log4js)(`REQUEST PARAMS: ${JSON.stringify(res_value)}`);
        (0, helpers_1.Log4js)(`RESPONSE STATUS: ${response.statusCode}`);
        let oldSend = response.send;
        response.send = function (data) {
            (0, helpers_1.Log4js)(`RESPONSE STATUS: ${data}`);
            response.send = oldSend;
            return response.send(data);
        };
        next();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura body
        this.app.use(express_1.default.json());
        //Carepta publica
        this.app.use(express_1.default.static('public'));
        //Logger
        this.app.use(this.logger);
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.categorias, categorias_1.default);
        this.app.use(this.apiPaths.productos, productos_1.default);
        this.app.use(this.apiPaths.clientes, clientes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose en el puerto: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map