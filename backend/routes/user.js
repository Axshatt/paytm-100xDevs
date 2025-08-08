import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router();

router.get("/users",(req,res)=>{
    res.send("Users")

})

export default router