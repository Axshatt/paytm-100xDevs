import express from "express";
import { Router } from "express";
import usersRoute from "./routes/index.js"


const app = express();


app.use('/api/v1', usersRoute)


app.listen(3000, (Err) => {
    if (Err) {
        console.log(Err);
    }


})