import express from 'express';

import {
    getPembicara,
    createPembicara,
    updatePembicara,
    deletePembicara
}
from "../controllers/PembicaraController";

const router = express.Router();
router.get("/", getPembicara);
router.post("/", createPembicara);
router.put("/:id", updatePembicara);
router.delete("/:id", deletePembicara);

export default router;