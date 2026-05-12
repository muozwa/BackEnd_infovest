import express from "express";
import cors from "cors";

import eventRoute from "./routes/eventRoute";
import categoryRoute from "./routes/categoryRoute";
import SpeakerRoute from "./routes/SpeakerRoutes";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Selamat sore pangeran");
});

app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/speakers", SpeakerRoute);

app.listen(port, () => {
    console.log(`server running on port http://localhost:${port}`);
});