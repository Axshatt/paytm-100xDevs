import express from "express"
import jwt from "jsonwebtoken"
import userModal from "../db";
import JWT_SECRET from "../config"
import zod from "zod";

const router = express.Router();

const signupBody = zod.body({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})
router.post("/user/signup", async (req,res)=>{

    const {sucess} = signupBody.safeParse(req.body);
    if(!sucess){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await userModal.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.sendStatus(411).json({
            message:"Email already taken/Incorrect Inputs"
        })
    }

    const user = await userModal.create({
        firstName:firstName,
        lastName:lastname,
        username:username,
        password:password
    })
    const userId = user._id;

    if(userId){
        const token = jwt.sign({
            userId
        },JWT_SECRET);
        res.json({
            message:"User Created successfully",
            token:token
        })

    }


})
export default router