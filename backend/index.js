import express from "express";
import usersRoute from "./routes/user.js"
import cors from "cors"
import bodyParser from "body-parser";



const app = express();
app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1', usersRoute)

app.listen(3000, (Err) => {
    if (Err) {
        console.log(Err);
    }
})