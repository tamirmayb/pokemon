import { PORT } from "./constants/pokemon.constants";
import app from "./app";

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
