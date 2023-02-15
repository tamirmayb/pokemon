import { Request, Response, Router } from "express";

import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  public router = Router();
  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);

    this.router.route("/fight/:pokecount").get(this.fight);

    this.router.route("/:id").get(this.findById).put(this.update);
  }

  private fight = async (req: Request, res: Response) => {
    const pokecount: number = +req.params.pokecount;
    const pokemonsFight = await this.pokemonService.fight(pokecount);
    res.send(pokemonsFight);
  };

  private findAll = async (_: Request, res: Response) => {
    const pokemons = await this.pokemonService.findAll();
    res.send(pokemons);
  };

  private findById = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const pokemon = await this.pokemonService.find(id);
    res.send(pokemon);
  };

  private update = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const updatePokemonResult = await this.pokemonService.update(id, req.body);
    res.send(updatePokemonResult);
  };
}
