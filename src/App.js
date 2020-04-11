import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
      }
    )
  }, [])

  async function handleAddRepository() {
    // TODO
    const newData = {
      title: "Desafio ReactJS",
      url: "https://github.com",
      techs: ["teste"]
    }
    
    api.post('repositories', newData).then(response => {
      setRepositories([...repositories, {...newData, id: response.data.id}]);
    }
  )
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`/repositories/${id}`).then(response => {
        if(response.status === 204){

          var newRepos = repositories.filter(repo => repo.id !== id);
          setRepositories(newRepos);
        }
      }
    )
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
