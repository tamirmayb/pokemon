import { Document } from "mongoose";

export interface IPokemon extends Document {
  pokeid: number;
  name: string;
  type_1: string;
  type_2: string;
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  generation: number;
  legendary: boolean;
}
