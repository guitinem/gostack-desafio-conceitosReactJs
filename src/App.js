import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Projeto teste ${Date.now()}`,
      url: 'https://github.com',
      techs: ['node', 'react']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const index = repositories.findIndex(item => item.id === id);

    repositories.splice(index, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repostiory => 
          <li key={repostiory.id}>
            {repostiory.title}
            <button onClick={() => handleRemoveRepository(repostiory.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
