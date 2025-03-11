import express from "express";
import { 
  registerUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  loginUser, 
  getUserProfile 
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Import protect middleware

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/profile", protect, getUserProfile); // ✅ Protect profile route

export default router;
