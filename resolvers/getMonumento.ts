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
        
        res.status(200).send({
            nombre: monumento.nombre,
            descripcion: monumento.descripcion,
            CP: monumento.CP,
            ISO: monumento.ISO,
            ciudad: monumento.ciudad,
            continente: monumento.continente,
            hora: monumento.hora,
            tiempo: monumento.tiempo,
            id: monumento._id.toString(),
          });

        
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default getMonumento;