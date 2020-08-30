import mongoose from 'mongoose';

export async function startConnection(){
   await mongoose.connect('mongodb://localhost/photo-gallery-db', {
    useNewUrlParser : true , //para que no de error por consola
    useUnifiedTopology: true,
    useFindAndModify: false
   });
   console.log("Estas Conectado a la BD");
}