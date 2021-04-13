import cors from "cors";
import { connect } from "mongoose";
import express, { json, urlencoded } from "express";
import router from "./routes/posts";


const app=express();
app.use(json({limit:"30mb",extended :true}));
app.use(urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use("/posts", router);
const connection_url ="mongodb+srv://vipin:vipinvipin@cluster0.osewi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT=process.env.PORT | 5000;

connect(connection_url, {useNewUrlParser: true,useUnifiedTopology:false})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on Port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(error.message);
})

