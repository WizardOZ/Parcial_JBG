// Imports :
import { Request, Response } from "npm:express@4.18.2";

const getMonumento = async (req: Request, res: Response) => {
    try {
        
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default getMonumento;