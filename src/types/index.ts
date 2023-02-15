import { IPokemon } from "../interfaces/pokemon.interface";

export interface IPokemonDTO {
  pokeid: number;
  name: string;
  total: number;
  legendary: boolean;
}

export const DEFAULT_TYPE_MODIFIER = 1;

export const typeChart: Record<string, Record<string, number>> = {
  Electric: { Water: 2, Rock: 0.5 },
};

export type PokemonType = "Electric" | "Rock" | "Water";

export interface IFightSummary {
  summary: string[];
  pokemonsIds: number[];
}

export interface IMatchSummary {
  winner: IPokemon;
  summary: string;
}
