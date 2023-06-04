import { useState, useEffect } from "react";

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery);
  }, []);

  async function search(q) {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );

    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  }

  return { search, animals };
}

function App() {
  const { animals, search } = useAnimalSearch();

  return (
    <main>
      <h1>Animal Farm</h1>

      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => search(e.target.value)}
      />

      {console.log("uo")}
      <ul>
        {animals.map((animal, i) => {
          return <Animal key={animal.id} {...animal} index={i} />;
        })}

        {animals.length === 0 ? <p>No animals found</p> : null}
      </ul>
    </main>
  );
}

function Animal({ type, name, age, index }) {
  return (
    <li>
      {index}. <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App;
