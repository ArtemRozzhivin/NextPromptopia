import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if(isConnected){
    console.log('MongoDB is already connected!')
    return
  }

  try {
    await mongoose.connect(mongoURI, {
      dbName: 'share_prompts',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected to MongoDB successfully!')
    
    isConnected = true
  } catch (error) {
    
  }
}