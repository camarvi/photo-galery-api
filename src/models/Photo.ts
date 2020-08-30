import { Schema, model, Document } from 'mongoose';


//Defini un schema de mongoose
const schema = new Schema({
    title : String,
    description: String,
    imagePath:String
});

//Interfaz creada en TS
interface IPhoto extends Document {
    title : string;
    description: string;
    imagePath: string;
}

//Creo un modelo en la BD basado en el esquema anterior
//El modelo tiene que cumplir con la extructura de la interfaz
export default model<IPhoto>('Photo', schema);