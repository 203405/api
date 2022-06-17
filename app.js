import express from 'express';
import { api } from './config/config.js';
import user from './router/user.js';

const app = express();

//ROUTERS micro servicio
app.use('/api/user', user)

//Ejecucion del servidor
app.listen(api.port, () => {
    console.log('Servidor corriendo en el puerto en el puerto =>', api.port)
}
);