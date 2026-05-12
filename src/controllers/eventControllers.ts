import {Request, Response} from "express";
import {Event} from "../types/event";

let events: Event[] = [];

//1. menampilkan data event
export const getEvents = (req: Request, res: Response) => {
    res.json(events);
};

//2. menyimpan data event
export const createEvent = (req: Request, res: Response) => {
    const {name, category, tanggal, description} = req.body;

    if(!name || !category || !tanggal || !description){ {
        return res.status(500).json({message: "Nama, category, tanggal, dan description harus diisi"});
    }

    const  newEvent : Event ={
        id: events.length + 1,
        name: name,
        category: category,
        tanggal: new Date(tanggal),
        description: description
    }

    events.push(newEvent);
    res.status(201).json({message: "Event berhasil ditambahkan", event: newEvent});
};};
//3. mengambil data event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    
    if (!event) {
        return res.status(404).json({message: "Event tidak ditemukan"});
    }
    res.json(event);
};

//4. mengupdate data event berdasarkan id
export const updateEvent = (req: Request, res: Response) => {};
//5 menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {};