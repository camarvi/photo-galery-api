
import { Request, Response} from 'express';

import path from 'path';

//Importo módulo para poder trabjar con archivos
import fs from 'fs-extra';

// Importar el modelo de datos 
import Photo from '../models/Photo'; //Se importa todo el módulo


export async function getPhotos(req : Request, res : Response) : Promise<Response>{

    const photos = await Photo.find(); //Devuelvo todas las fotos de la BD de Moongo
    return res.json(photos);

}

export async function getPhoto(req : Request, res : Response): Promise<Response> {

    //console.log(req.params);
    
    //Recibo el ID que quiero buscar
    const id_photo = req.params.id;
    //Busco la foto
    const photo = await Photo.findById(id_photo);
    //Devuelvo la informacion del registro encontrado
    return res.json(photo);

}

export async function createPhoto(req : Request, res : Response) : Promise<Response>{

    const {title, description } = req.body;
    //console.log(req.file);
    //Creo un objeto donde almacenar los datos para luego
    // guardarlo en MoongoDB

    const newPhoto = {
        title : title,
        description : description,
        imagePath : req.file.path //ruta donde esta la imagen que es uploads/[nombrecodificado].jpg
    }
    
    //Creo un nuevo objeto con los valores anteriores

    const photo = new Photo(newPhoto); //Se genera un nuevo documento y se guarda en photo

    //Guardo la información en la BD
    await photo.save()

    console.log('Guardando Foto');
    console.log(req.body);
    return res.json({
        message : 'Photo almacenada correctamente',
        photo //devuelvo la informacion de la foto guardada
    });
}

export async function deletePhoto(req : Request, res : Response) : Promise<Response> {

    const { id } = req.params // Recibo el id de la foto
    const photo = await Photo.findByIdAndRemove(id); //Eliminar registro de la BD
    //Elimina la foto de la carpeta uploads
    if (photo) {
      await fs.unlink(path.resolve(photo.imagePath));
    }

    return res.json({
            message : 'Foto eliminada',
            photo
         });
}


export async function updatePhoto(req : Request, res : Response) : Promise<Response> {

    const { id } = req.params;
    const {title, description} = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id,{
        title,
        description
    },{new : true}); //new : true es para que devuelva el objeto actualizado

    return res.json({
        message : 'Foto Actualizada',
        updatedPhoto
    })


}