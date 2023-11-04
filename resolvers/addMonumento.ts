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
        const response = await fetch(
            `https://zip-api.eu/api/v1/info/${ISO}-${CP}?fields=place_name`
          );
          const ciudad = await response.json();

          const responses = await fetch(
            `https://restcountries.com/v3.1/capital/${ciudad}?fields=region`
          );
          let continente = await responses.json();
           continente = continente[0].region;
         

          const responsees = await fetch(
            `https://worldtimeapi.org/api/timezone/Europe/Madrid`
          );
          let hora = await responsees.json();
           hora = hora.datetime;

           const responseess = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=b555e744249649bca82141530230411&q=London&aqi=no`
          );
          let tiempo = await responseess.json();
           
           tiempo = tiempo.current;

          const newMonumento = new MonumentoModel({ nombre, descripcion, CP , ISO, ciudad, continente,hora,tiempo});
        await newMonumento.save();

        res.status(200).send({
            nombre: newMonumento.nombre,
            descripcion: newMonumento.descripcion,
            CP: newMonumento.CP,
            ISO : newMonumento.ISO,
            Ciudad : newMonumento.ciudad,
            Continente : newMonumento.continente,
            Hora : newMonumento.hora,
            Tiempo: newMonumento.tiempo,
            id: newMonumento._id.toString(),
          });
    }
    catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addMonumento;

