import express from "express"
import jwt from "jsonwebtoken"
import userModal from "../db";
import JWT_SECRET from "../config"
import zod from "zod";
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router();


router.post("/user/signup", async (req, res) => {
    const signupBody = zod.body({
        username: zod.string().email(),
        firstName: zod.string(),
        lastName: zod.string(),
        password: zod.string()
    })
    const { sucess } = signupBody.safeParse(req.body);
    if (!sucess) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await userModal.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.sendStatus(411).json({
            message: "Email already taken/Incorrect Inputs"
        })
    }

    const user = await userModal.create({
        firstName: firstName,
        lastName: lastname,
        username: username,
        password: password
    })
    const userId = user._id;

    if (userId) {
        const token = jwt.sign({
            userId
        }, JWT_SECRET);
        res.json({
            message: "User Created successfully",
            token: token
        })

    }


})

router.put("/", authMiddleware, async (req, res) => {
    const userBody = zod.body({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional()
    })

    const { success } = userBody.safeParse(req.body);

    if (!success) {
        return res.status(403).json({
            msg: "Incorrect credentials"
        })
    }
    await userModal.updateOne(req.body, {
        id: req.userId
    })
    res.json({
        msg: "Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await userModal.find({
        $or: [
            {
                firstName: {
                    "$regex": filter

                }
            }
            ,
            {
                lastName: {
                    "$regex": filter

                }
            }
        ]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastname:user.lastName,
            _id:user._id

        }))
    })

})
export default router