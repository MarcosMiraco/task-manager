import mongoose from 'mongoose';


export const connectDatabase = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado');
};