require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

app.get("/", (_, res) => {
    res.send("<h1><em>Gooonj</em> API</h1>");
});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server Listening at 3000");
    });
});
