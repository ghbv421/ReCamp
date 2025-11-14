import express from "express";
import "dotenv/config.js";
import { use } from "react";

import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app,use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
