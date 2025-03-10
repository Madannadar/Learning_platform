const express = require("express");
const router = express.Router();
// const userController = require("../controllers/userController.js");
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser  } from "../controller/userController.js";

// Define routes
router.post("/register", userController.registerUser);
router.post("/login", loginUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
