import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'

import dbConnnection from '../database/config';
import userRoutes from '../routes/usuarios';
import authRoutes from '../routes/auth';
import categoriaRoutes from '../routes/categorias';
import productoRoutes from '../routes/productos';
import { Log4js } from '../helpers';

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        categorias: '/api/categorias',
        productos: '/api/productos',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8800';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        try {
            await dbConnnection();
            console.log('database on lines')
        } catch (error) {
            
        }
    }

    logger(request: Request, response: Response, next: NextFunction){       
        Log4js(`${request.method} ${request.url} ${request.hostname}`);
        var res_value = request.method === "GET"?request.query:request.body;
        Log4js(`REQUEST PARAMS: ${JSON.stringify(res_value)}`);
        Log4js(`RESPONSE STATUS: ${response.statusCode}`);
        let oldSend = response.send
        response.send = function(data) {
            Log4js(`RESPONSE STATUS: ${data}`);
            response.send = oldSend
            return response.send(data)
        }
        next();
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura body
        this.app.use(express.json());
        //Carepta publica
        this.app.use(express.static('public'));
        //Logger
        this.app.use(this.logger);
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.categorias, categoriaRoutes);
        this.app.use(this.apiPaths.productos, productoRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            
            console.log('Servidor ejecutandose en el puerto: ' + this.port)
        })
    }
}

export default Server;