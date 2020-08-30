import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

//Definir ruta donde se suben las imagenes
//Hay que dar permisos a la carpeta para que se 
//puedan subir ficheros a nivel de SO


const storage = multer.diskStorage({
    destination: 'uploads', // Carpeta uploads del proyecto
    //Poder renombrar los archivos subidos
    filename : (req, file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

export default multer({storage});