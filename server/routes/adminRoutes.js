import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllComments, getAllNewsAdmin, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments );
adminRouter.get("/news", auth, getAllNewsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentById );
adminRouter.post("/approve-comment", auth, approveCommentById );
adminRouter.get("/dashboard", auth, getDashboard);


export default adminRouter;
