import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList.tsx";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

interface ListItem {
  name: string;
  url: string;
}

export default function App() {
  const [data, setData] = useState<Pokemon[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const listRes = await fetch("https://pokeapi.co/api/v2/pokemon");

      if (listRes.status >= 299) {
        setError("Something went wrong " + listRes.status);
        return;
      }

      const { results }: { results: ListItem[] } = await listRes.json();
      let pokemons: Pokemon[] = [];

      for (let i = 0; i < results.length; i++) {
        const res = await fetch(results[i].url);

        if (res.status >= 299) {
          setError("Something went wrong " + res.status);
          return;
        }

        const pokemon = await res.json();

        pokemons = [
          ...pokemons,
          {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            image: pokemon.sprites.front_default,
          },
        ];
      }

      setData(pokemons);
    }

    fetchData()
        .then(() => console.log("Data fetched successfully"))
        .catch((e: Error) => setError("This was the error: " + e));
  }, []);

  return (
      <>
        <div
            style={{
              backgroundColor: "red",
              color: "white",
              height: "15vh",
              paddingTop: "8vh",
              textAlign: "center",
            }}
        >
          <h1 style={{ margin: 0, fontSize: "60px" }}>Pokémon</h1>
        </div>

        <div
            style={{
              backgroundColor: "white",
              minHeight: "50vh",
              padding: "20px",
              textAlign: "center",
            }}
        >
          {error ? <p>{error}</p> : <PokemonList data={data} />}
        </div>
      </>
  );
}