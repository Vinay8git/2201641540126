import mongoose from 'mongoose';
console.log(process.env.MONGO_URI); // Log the MongoDB URI for debugging
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);       
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;