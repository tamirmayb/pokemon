import { HttpError } from "../errors/http.error";
import { IPokemon } from "../interfaces/pokemon.interface";
import { calculateDamage } from "../damageCalculator";
import { IFightSummary, IMatchSummary, IPokemonDTO } from "../types";
import Pokemon from "../models/pokemon.model";

export class PokemonService {
  public async findAll(): Promise<IPokemonDTO[]> {
    const sort = { pokeid: 1 };
    return Pokemon.find({})
      .sort(sort)
      .then(function (result: IPokemon[]) {
        return result.map((pokemon) => {
          const { pokeid, name, total, legendary } = pokemon;
          return {
            pokeid,
            name,
            total,
            legendary,
          };
        });
      });
  }

  public find(id: number): Promise<IPokemon> {
    return Pokemon.findOne({ pokeid: id });
  }

  public async update(id: number, pokemon: IPokemon | Partial<IPokemon>) {
    const updatedPokemon: Promise<IPokemon> = await Pokemon.findOneAndUpdate(
      { pokeid: id },
      pokemon
    ).exec();

    if (!updatedPokemon) {
      throw new HttpError(`Pokemon with pokeid '${id}' not found`, 404);
    }
    return updatedPokemon;
  }

  public async fight(numberOfPokemons: number) {
    const count = await Pokemon.countDocuments();
    const pokemonsIds: number[] = Array.from({ length: numberOfPokemons }, () =>
      Math.floor(Math.random() * count + 1)
    );
    return this.doFight({
      summary: [],
      pokemonsIds,
    });
  }

  private async doFight(fightSummary: IFightSummary): Promise<IFightSummary> {
    const { pokemonsIds, summary } = fightSummary;

    const winners: number[] = [];
    if (pokemonsIds.length > 1) {
      const middleIndex = Math.ceil(pokemonsIds.length / 2);
      const group1 = pokemonsIds.splice(0, middleIndex);
      const group2 = pokemonsIds.splice(-middleIndex);

      for (const group1MemberId of group1) {
        const index = group1.indexOf(group1MemberId);
        const group2MemberId = group2[index];
        const pokemon1: IPokemon = await this.find(group1MemberId);
        const pokemon2: IPokemon = await this.find(group2MemberId);

        const matchSummary: IMatchSummary = await this.getWinner(
          pokemon1,
          pokemon2
        );
        winners.push(matchSummary.winner.pokeid);
        summary.push(matchSummary.summary);
      }

      return this.doFight({
        summary,
        pokemonsIds: winners,
      });
    } else {
      const winner: IPokemon = await this.find(pokemonsIds[0]);
      summary.push(winner.name + " is the champion !!!!");
      return {
        summary,
        pokemonsIds: [],
      };
    }
  }

  private async getWinner(
    pokemon1: IPokemon,
    pokemon2: IPokemon
  ): Promise<IMatchSummary> {
    const damageToPokemon2 = calculateDamage(pokemon1, pokemon2);
    const damageToPokemon1 = calculateDamage(pokemon2, pokemon1);

    let coinToss = 0;
    if (damageToPokemon1 === damageToPokemon2) {
      coinToss = Math.floor(Math.random() * 2) + 1;
    }
    if (damageToPokemon2 > damageToPokemon1 || coinToss > 1) {
      return this.getMatchSummary(pokemon1, pokemon2);
    } else {
      return this.getMatchSummary(pokemon2, pokemon1);
    }
  }

  private async getMatchSummary(winner: IPokemon, loser: IPokemon) {
    return {
      winner,
      summary: winner.name + " won against " + loser.name,
    };
  }
}
