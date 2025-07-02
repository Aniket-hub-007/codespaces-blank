import express from "express"
import { addComment, addNews, deleteNewsById, getAllNews, getNewsById, getNewsComment, togglePublish } from "../controllers/newsController.js";
import upload from "../middleware/multer.js"
import auth from "../middleware/auth.js";

const newsRouter = express.Router();

newsRouter.post("/add", upload.single('image'), auth, addNews);
newsRouter.get('/all', getAllNews);
newsRouter.get('/:newsId', getNewsById);
newsRouter.post('/:newsId', auth, deleteNewsById);
newsRouter.post('/:toggle-publish', auth, togglePublish);
newsRouter.post('/add-comment', addComment);
newsRouter.post('/add-comment', getNewsComment);

export default newsRouter;