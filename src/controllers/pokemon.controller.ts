import { Request, Response, Router } from "express";
import * as jwtToken from "jsonwebtoken";

import { PokemonService } from "../services/pokemon.service";

const secret = "my-secret-key";

export class PokemonController {
  public router = Router();
  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);

    this.router.route("/login").post(this.login);

    this.router.route("/fight/:pokecount").get(this.fight);

    this.router.route("/:id").get(this.findById).put(this.update);
  }

  private verifyToken = async (req: Request, res: Response) => {
    const auth = req.headers["authorization"];
    if (typeof auth !== "undefined") {
      const bearer = auth.split(" ");
      const token = bearer[1];
      jwtToken.verify(token, secret);
      return;
    }
    res.status(401).send("Invalid login credentials");
  };

  private login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === "user" && password === "password") {
      const token = jwtToken.sign({ username }, secret, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).send("Invalid login credentials");
    }
  };

  private findAll = async (req: Request, res: Response) => {
    await this.verifyToken(req, res);
    const pokemons = await this.pokemonService.findAll();
    res.send(pokemons);
  };

  private findById = async (req: Request, res: Response) => {
    await this.verifyToken(req, res);
    const id: number = +req.params.id;
    const pokemon = await this.pokemonService.find(id);
    res.send(pokemon);
  };

  private update = async (req: Request, res: Response) => {
    await this.verifyToken(req, res);
    const id: number = +req.params.id;
    const updatePokemonResult = await this.pokemonService.update(id, req.body);
    res.send(updatePokemonResult);
  };

  private fight = async (req: Request, res: Response) => {
    await this.verifyToken(req, res);
    const pokecount: number = +req.params.pokecount;
    const pokemonsFight = await this.pokemonService.fight(pokecount);
    res.send(pokemonsFight);
  };
}
