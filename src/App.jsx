import './App.css';
import { useEffect, useState } from 'react';

function App () {
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState(null)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemon = async (pokemonName) => {
    try {
      setIsLoading(true)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

      if(!res.ok){
        throw new Error (`Pokemon not found. ${res.status}`)
      }

      const data = await res.json()
      setPokemon(data)
    } catch (err) {
      setError(err.message)
      console.error(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)

    const trimName = name.trim()
    if(!trimName){
      setPokemon(null)
      setError(null)
      return
    }
    const delay = setTimeout(() => {
      getPokemon(name)
    }, 500)

    return () => clearTimeout(delay)

  }, [name])

  return(
    <>
      <input 
      type='text' 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {pokemon && 
      <div className='container'>
        <div className='content'>
          <h2>{pokemon.name}</h2>
          <div className='pokemon'>
            <img src={pokemon.sprites?.other['official-artwork']?.front_default} alt={pokemon.name}/>
          </div>
        </div>
      </div>
      }
    </>
  )
};

export default App;
