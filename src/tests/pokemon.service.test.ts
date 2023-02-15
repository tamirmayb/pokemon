import { suite, test } from "@testdeck/mocha";
import * as _chai from "chai";
import { PokemonService } from "../services/pokemon.service";
const sinon = require("sinon");

_chai.should();
@suite
class PokemonServiceTests {
  private pokemonService: PokemonService;

  before() {
    this.pokemonService = new PokemonService();
  }

  @test "should do something when call a method"() {
    // const stub = sinon.stub(this.pokemonService, "countPokemons").returns(4);
    // const stub2 = sinon.stub(this.pokemonService, "doFight").returns(4);
    //
    // const spy = sinon.spy(this.pokemonService, "doFight", ["get", "set"]);
    // object.test = 42;
    //
    // console.log(11111);
    const iPokemonPromise = this.pokemonService.fight(4);
  }
}
