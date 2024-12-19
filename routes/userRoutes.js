import express from "express";
import {
  handleCreateUser,
  handleGetUser,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/create", handleCreateUser);
router.get("/get", handleGetUser);

export default router;
