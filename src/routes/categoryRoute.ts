import {getCategories, 
        createCategory, 
        getCategoryById, 
        updateCategory, 
        deleteCategory} from "../controllers/categoryControllers";

import express from "express";


const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);