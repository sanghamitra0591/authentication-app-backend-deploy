const express= require("express");
const { connection } = require("./config/db");
const { validator } = require("./middlewares/validator.middleware");
const { profileRouter } = require("./routes/profile.route");
const { userRouter } = require("./routes/user.route");

const app= express();

const cors= require("cors");

app.use(cors({
    origin: "*"
}))

app.use(express.json())

require("dotenv").config();

app.get("/", (req, res)=>{
    res.send("Welcome to HomePage")
})

app.use("/", userRouter);

app.use(validator);

app.use("/", profileRouter);



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log({"error": error})
    }
    console.log(`Running at port ${process.env.port}`)
})