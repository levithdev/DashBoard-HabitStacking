import React, { useState } from "react"

function App() {
  const [listaDeTarefa, setListaDeTarefa] = useState<string[]>([]);
  const [valor, setValor] = useState<string>("")

  function Colheta(dado: string) {
    setListaDeTarefa([...listaDeTarefa, dado])
  }
  const KeyDownEnter= (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      Colheta(valor);
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
          {listaDeTarefa.map((item, index) => (
            <li key={index}> {item} </li>
          ))}
        </ul>
    </div>
  )
}

export default App
