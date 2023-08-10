import express, { Application } from 'express';
import cors from 'cors'

import dbConnnection from '../database/config';
import userRoutes from '../routes/usuarios';
import authRoutes from '../routes/auth';
import categoriaRoutes from '../routes/categorias';

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        categorias: '/api/categorias',
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

    middlewares(){
        //CORS
        this.app.use(cors())
        //Lectura body
        this.app.use(express.json());
        //Carepta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.categorias, categoriaRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            
            console.log('Servidor ejecutandose en el puerto: ' + this.port)
        })
    }
}

export default Server;