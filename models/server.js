const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authpath = '/api/auth';

        //Conectar a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.authpath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port,() => {
            console.log('Servidor corriendo en puerto',this.port);
        })
        
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }
    
}

module.exports=Server;