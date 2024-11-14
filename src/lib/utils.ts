import mongoose from "mongoose";

const connection: { isConnected?: boolean } = {};

export const connectToDb = async() => {
    try{
        if(connection.isConnected){
            console.log("Using existing connection");
            return;
        }
        else{
            if (!process.env.MONGO) {
                throw new Error("MONGO environment variable is not defined");
            }
            const db = await mongoose.connect(process.env.MONGO);
            connection.isConnected = db.connections[0].readyState === 1;
        }
    }catch(error){
        console.error("Error connecting to database", error);
    }
}