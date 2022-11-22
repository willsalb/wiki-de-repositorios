import gitLogo from "../assets/github.png";

import { Container } from "./styles";
import Input from "../components/input";
import Button from "../components/button";
import ItemRepo from "../components/itemRepo";
import { api } from "../services/api";
import { useState } from "react";

function App() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [repository, setRepository] = useState([]);

  //Função async por estar buscando um dado de alguma api(pode levar um tempo).
  const searchRepository = async () => {
    const { data } = await api.get(`repos/${currentSearch}`);

    if (data.id) {
      const exist = repository.find((repo) => repo.id === data.id);

      if (!exist) {
        //Pega o que ja tem de testado antes('prev'), concatena tudo com o novo estado('data').
        setRepository((prev) => [...prev, data]);
        setCurrentSearch("");
        return;
      }
    }
    alert("Repositório não encontrado!");
  };

  const removeRepo = (id) => {
    console.log("Removendo repositório", id);

    const remove = repository.filter((repo) => repo.id !== id);
    setRepository(remove);
  };

  return (
    //Fazendo um map para cada item do repository para exibir o componente. Passando o parametro repo para o itemRepo que vai ter todos os dados do repository que está fazendo o map.
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Logo" />
      <Input
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
      />
      <Button onClick={searchRepository} />
      {repository.map((repo) => (
        <ItemRepo removeRepo={removeRepo} repo={repo} />
      ))}
    </Container>
  );
}

export default App;
