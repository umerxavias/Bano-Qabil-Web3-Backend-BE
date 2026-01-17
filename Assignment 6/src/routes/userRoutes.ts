import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";
import { authenticate, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

// All routes are protected and admin only
router.use(authenticate);
router.use(isAdmin);

// GET /users
router.get("/", getAllUsers);

// GET /users/:id
router.get("/:id", getUserById);

// PUT /users/:id
router.put("/:id", updateUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

export default router;
