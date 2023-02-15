import { IPokemon } from "../interfaces/pokemon.interface";
import { DEFAULT_TYPE_MODIFIER, PokemonType, typeChart } from "../types";

export const calculateDamage = (
  attacker: IPokemon,
  defender: IPokemon
): number => {
  const attack = attacker?.attack ?? 0;
  const attackerType = attacker.type_1 ?? "";

  const defense = defender.defense ?? 0;
  const defenderType = defender?.type_1 ?? "";
  return Math.floor(
    ((30 * attack) / defense) * getTypeModifier(attackerType, defenderType)
  );
};

const checkIncluded = (type: string): type is PokemonType => {
  return ["Electric", "Rock", "Water"].includes(type);
};

const getTypeModifier = (
  attackerType: string,
  defenderType: string
): number => {
  try {
    if (checkIncluded(attackerType) && checkIncluded(defenderType)) {
      return typeChart[attackerType][defenderType];
    } else {
      return DEFAULT_TYPE_MODIFIER;
    }
  } catch (e) {
    return DEFAULT_TYPE_MODIFIER;
  }
};
