import express from 'express';
import morgan from 'morgan';
//Utilizar path
import path from 'path';

// Importar el Router
import indexRoutes from './routes/index';

const app = express();

// setings
// Se establece el valor de la variable port
app.set('port', process.env.PORT || 4000);

// MIDDLEWARES

app.use(morgan('dev')); //Utilizar morgan en version de desarrollo
//Morgan se encargar de mostrar mensajes en consola conforme los 
//clientes realizan peticiones al servidor de node
app.use(express.json());


// routes
//Las rutas son manejadas desde indexRoutes que esta en routes/index.ts
app.use('/api', indexRoutes);

//Definir fichero de subida de las imagenes (carpeta uploads)

app.use('/uploads', express.static(path.resolve('uploads')));

export default app;