import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

//1. menampilkan data category
export const getCategories = (req: Request, res: Response) => {
    res.json(categories);
};

//2. menyimpan data category
export const createCategory = (req: Request, res: Response) => {
    const {name} = req.body;
    
        if(!name){ 
            return res.status(500).json({
                message: "Nama harus diisi"});
        }
    
        const  newCategory : Category ={
            id: Date.now(),
            name: name,
        };
    
        categories.push(newCategory);
        res.status(201).json(newCategory);

};

//3. mengambil data category berdasarkan id
export const showCategoryById = (req: Request, res: Response) => {};

//4. mengupdate data category berdasarkan id
export const updateCategory = (req: Request, res: Response) => {};

//5 menghapus data category berdasarkan id
export const deleteCategory = (req: Request, res: Response) => {};
