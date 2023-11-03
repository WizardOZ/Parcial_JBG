// Imports :
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/Monumento.ts";

const addMonumento = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, CP } = req.body;
        if (!nombre || !descripcion || !CP) {
        res.status(400).send("Nombre, descripcion y CP are required");
        return;
        }
        const alreadyExists = await MonumentoModel.findOne({ nombre }).exec() && await MonumentoModel.findOne({ CP }).exec();
        if (alreadyExists) {
        res.status(400).send("Monumento already exists");
        return;
        }

        const newMonumento = new MonumentoModel({ nombre, descripcion, CP });
        await newMonumento.save();

        res.status(200).send({
            nombre: newMonumento.nombre,
            descripcion: newMonumento.descripcion,
            CP: newMonumento.CP,
            id: newMonumento._id.toString(),
          });
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addMonumento;

