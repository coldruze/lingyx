const express = require("express"),
    mongoose = require("mongoose"),
    cors = require("cors"),
    config = require("./config.json"),
    app = express(),
    port = config.port,
    dbUrl = config.mongoUrl,
    router = require("./routes/index"),
    errorMiddleware = require("./middleware/error"),
    cookieParser = require("cookie-parser")

app.use(cors({
    credentials: true,
    origin: config.clientUrl
}));
app.use(cookieParser())
app.use(express.json());
app.use("/", router);
app.use(errorMiddleware);

const start = async function () {
    try {
        await mongoose.connect(dbUrl);
        app.listen(port);
    } catch (e) {
        console.log(e);
    }
};

start().then(() => console.log(`Server is running on localhost:${port}`));