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
  function deletarFunção(id: number) {
    setListaDeTarefa(prev => {
      const update = [...prev];
      const index = update.findIndex(tarefa => tarefa.id === id);
      
      if (index !== -1) {
        update.splice(index, 1);
      }
      
      return update;
      }
    )
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
   function mudaNome(id: number, novoNome:string) {
    setListaDeTarefa(prev => 
      prev.map(tarefa => 
        tarefa.id === id 
        ? {...tarefa, nome: novoNome}
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
  const handleEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    acao: () => void
  ) => {
    if (event.key === "Enter") {
      acao()
    }
  }

  return (
    <div>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={(e) =>
          handleEnter(e, () => {
            addTarefa(valor)
            setValor("")
          })
        }
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
              onKeyDown={(e) => 
                handleEnter(e, () => {
                  mudaNome(tarefa.id, novoNome)
                  modoEdicao(tarefa.id)
                  SetNovoNome("")
                })}
               />
            ) : (
              <button onClick={() => modoEdicao(tarefa.id)}>
                {tarefa.nome}
              </button>
            )
            }
            <button onClick={() => deletarFunção(tarefa.id)}> Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
