import { Schema, model } from "mongoose";

import { IPokemon } from "../interfaces/pokemon.interface";

export const PokemonSchema = new Schema(
    {
        pokeid: { type: Number, required: [true, "Field is required"] },
        name: { type: String, required: [true, "Field is required"] },
        type_1: { type: String, required: [true, "Field is required"] },
        type_2: { type: String, required: [true, "Field is required"] },
        total: { type: Number, required: [true, "Field is required"] },
        hp: { type: Number, required: [true, "Field is required"] },
        attack: { type: Number, required: [true, "Field is required"] },
        defense: { type: Number, required: [true, "Field is required"] },
        sp_atk: { type: Number, required: [true, "Field is required"] },
        sp_def: { type: Number, required: [true, "Field is required"] },
        speed: { type: Number, required: [true, "Field is required"] },
        generation: { type: Number, required: [true, "Field is required"] },
        legendary: { type: Boolean, required: [true, "Field is required"] },
    },
    { versionKey: false }
);

const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);

export default Pokemon;
