import React, { useState } from "react";
type tarefa = {
  id: number;
  nome: string;
  feito: boolean;
  editado: boolean;
}
function App() {
  const [listaDeTarefa, setListaDeTarefa] = useState<tarefa[]>([]);
  const [valor, setValor] = useState<string>("")
  const [novoNome, SetNovoNome] = useState<string>("")

  function criarTarefa(nome: string): tarefa {
    return {
      id: Date.now(),
      nome,
      feito: false,
      editado: false
    }
  }
  function modoEdicao(id: number) {
    setListaDeTarefa(prev =>
      prev.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, editado: !tarefa.editado }
          : tarefa
      )
    )
  }


  function toggleConclussao(id: number) {
    setListaDeTarefa(prev =>
      prev.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, feito: !tarefa.feito }
          : tarefa
      )
    )
  }
  function addTarefa(nome: string) {
    setListaDeTarefa(prev => [...prev, criarTarefa(nome)])
  }
  const KeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTarefa(valor);
      setValor("")
    }
  }

  return (
    <div>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={KeyDownEnter}
      />
      <ul>
        {listaDeTarefa.map((tarefa) => (
          <li key={tarefa.id}>
            <input
              type="checkbox"
              checked={tarefa.feito}
              onChange={() => toggleConclussao(tarefa.id)}
            />
            {tarefa.editado ? (
              <input 
              type="text"
              value={novoNome}
              onChange={(e) => SetNovoNome(e.target.value)}
               />
            ) : (
              <button onClick={() => modoEdicao(tarefa.id)}>
                {tarefa.nome}
              </button>
            )
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
