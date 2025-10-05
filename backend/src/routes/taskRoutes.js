import express from 'express';
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../controllers/TaskController.js";
import {protect} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/rbacMiddleware.js";

const router = express.Router()

router.route("/")
    .get(protect,getTasks)
    .post(protect,createTask);

router.route("/:taskId")
    .get(protect,getTaskById)
    .post(protect,createTask)
    .put(protect,updateTask)
    .delete(
        protect,
        authorize(['admin']),
        deleteTask
    );


export default router;