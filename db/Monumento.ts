import mongoose from "npm:mongoose@7.6.3";
import { Monumento } from "../types.ts";

const Schema = mongoose.Schema;

const monumentoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true, unique: true },
    CP: { type: Number, required: true },
    ISO: { type: String, required: true},
    ciudad: {type: String, required: false},
    continente: {type: String, required: false},
    hora: {type: String, required: false},
    tiempo: {type: String, required: false},
  },
  { timestamps: true }
);

export type MonumentoModelType = mongoose.Document & Omit<Monumento, "id">;

export default mongoose.model<MonumentoModelType>("Monumento", monumentoSchema);