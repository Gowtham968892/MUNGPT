import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () =>
            console.log("✓ Database connected")
        );

        mongoose.connection.on("error", (error) =>
            console.error("✗ MongoDB connection error:", error.message)
        );

        await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.error("✗ Failed to connect to MongoDB:", error.message);
        console.error("Check MongoDB Atlas IP whitelist or credentials in .env");
    }
};

export default connectDB;