import express from "express"
const AuthRouter = express.Router()

AuthRouter.get("/hello", (req, res) => {
    res.send("Hello world")
})

export default AuthRouter;
