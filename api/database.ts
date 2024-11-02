import mongoose from 'mongoose';

const mongoUri: string = process.env.MONGO_URI || 'mongodb://mongo:27017/MyData';



export const connectToDatabase = async (): Promise<void> => {

  console.log("bateu aqui");
  
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); 
  }
};
