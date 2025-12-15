import mongoose from 'mongoose';


// Function to connected to the mongbdb database

export const connectDB = async() => {
    try{
        mongoose.connection.on("connected",
            ()=> console.log("Database Connected")

        );
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
             dbName : "Chat-application",
        })
    }catch(error){
        console.log(error)
    }
}