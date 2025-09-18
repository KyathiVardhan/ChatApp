import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import chatRoutes from './routes/Chat.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use("/api/v1", chatRoutes);
const port = process.env.PORT || 5002;
try {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
}
catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}
//# sourceMappingURL=index.js.map