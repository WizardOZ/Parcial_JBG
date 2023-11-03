// Imports :
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/Monumento.ts";


const deleteMonumento = async (req: Request, res: Response) => {
    try {
        
        const { id } = req.params;
        const monumento = await MonumentoModel.findOneAndDelete({ id }).exec();
        if (!monumento) {
        res.status(404).send("Monumento not found");
        return;
        }
        res.status(200).send("Monumento deleted");
        }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default deleteMonumento;