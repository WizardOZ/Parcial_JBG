// Imports :
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/Monumento.ts";

const getMonumento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const monumento = await MonumentoModel.findOne({ id }).exec();
        if (!monumento) {
        res.status(404).send("Monumento not found");
        return;
        }
        const response = await fetch(
            `http://worldtimeapi.org/api/timezone/${monumento.ISO}`
          );

        res.status(200).send({
            nombre: monumento.nombre,
            ISO: monumento.ISO,
            ciudad: response,
            id: monumento._id.toString(),
          });

        
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default getMonumento;