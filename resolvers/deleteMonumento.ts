// Imports :
import { Request, Response } from "npm:express@4.18.2";

const deleteMonumento = async (req: Request, res: Response) => {
    try {
        
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default deleteMonumento;