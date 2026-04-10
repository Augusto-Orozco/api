import { Router } from "express"
import { getUsers, postUser, putUser, delUser } from "../controllers/users.controller.js"

const router = Router()

router.get("/users", getUsers)
router.get("/users/:id", getUsers)
router.post("/users", postUser)
router.put("/users/:id", putUser)
router.delete("/users/:id", delUser)

export default router