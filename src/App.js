import { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api'

function App() {

  const [ input, setInput ] = useState('')
  const [ cep, setCep ] = useState({});

  async function handleSearch() {
    if(input === ''){
      alert("Pesquise um CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("Erro ao buscar CEP!")
      setInput("")

    }
  }

  return (
    <div className="container">
      <h1 className="tittle">Buscar CEP</h1>

      <div className="container_input">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="button_procurar" onClick={handleSearch}>    
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
    
          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Local: {cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
