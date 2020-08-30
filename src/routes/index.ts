import { Router } from 'express';
const router = Router();

import { createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto } from '../controllers/photo.controller';

import multer from '../libs/multer'; //Si importa todo el objeto


router.route('/photos')
    .post(multer.single('image'), createPhoto) //Indico que voy a subir una imagen
    .get(getPhotos)
    
router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto)
//Se puede poner tambíen de la siguiente forma
//router.get('/', helloWorld);

//Exportar el enrutador (router)
export default router;