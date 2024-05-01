import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} 🟢`.underline.blue);
        //* listen to connection disconnection events
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected from MongoDB 🟡'.underline.yellow);
        });
    } catch (error) {
        console.error(`Error: ${error.message} 🔴`.underline.red)
        process.exit(1)
    }
}