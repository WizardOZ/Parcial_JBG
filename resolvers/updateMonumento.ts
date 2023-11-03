// Imports :
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/Monumento.ts";


const updateMonumento = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const { nombre, descripcion, CP, ISO } = req.body;
        if (!descripcion || !nombre || !CP || !ISO) {
            res.status(400).send("Nombre, desscripcion, Cp and ISO are required");
            return;
          }

        const updatedPerson = await MonumentoModel.findOneAndUpdate(
        { id },
        { nombre, descripcion, CP, ISO },
        { new: true }
        ).exec();

        if (!updatedPerson) {
        res.status(404).send("Monumento not found");
        return;
        }

        res.status(200).send({
        nombre: updatedPerson.nombre,
        descripcion: updatedPerson.descripcion,
        CP: updatedPerson.CP,
        ISO: updatedPerson.ISO,
        id: updatedPerson._id.toString(),
        });
        
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default updateMonumento;