// Imports :
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/Monumento.ts";

const addMonumento = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, CP, ISO } = req.body;
        if (!nombre || !descripcion || !CP || !ISO) {
        res.status(400).send("Nombre, descripcion ,CP and ISO are required");
        return;
        }
        const alreadyExists = await MonumentoModel.findOne({ nombre }).exec();
        if (alreadyExists) {
        res.status(400).send("Monumento already exists");
        return;
        }
        const ciudad = await fetch(
            `https://zip-api.eu/api/v1/info/${ISO}-${CP}`
          );
          const continente = await fetch(
            `https://restcountries.com/v3.1/capital/${ciudad}?fields=region`
          );
        const newMonumento = new MonumentoModel({ nombre, descripcion, CP , ISO, ciudad, continente});
        await newMonumento.save();

        res.status(200).send({
            nombre: newMonumento.nombre,
            descripcion: newMonumento.descripcion,
            CP: newMonumento.CP,
            ISO : newMonumento.ISO,
            ciudad : newMonumento.ciudad,
            continente : newMonumento.continente,
            id: newMonumento._id.toString(),
          });
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addMonumento;

