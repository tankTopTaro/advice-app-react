import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [quotes, setQuotes] = useState ({advice: ''})
  const [generate, setGenerate] = useState(false)

  useEffect(() => {
    const fetchAdvice = async () => {
      const data = await axios.get('https://api.adviceslip.com/advice')
      return data
    }
    
    fetchAdvice().then((response) => {
      const { advice } = response.data.slip
      setQuotes({advice: advice})
    }).catch((error) => {
      console.log(error)
    })

  }, [generate])

  function giveAdvice() {
    setGenerate(!generate)
  }

  return (
    <div className='app'>
      <div className='card'>
        <h1 className='heading'>{quotes.advice}</h1>
        <button className='button' onClick={giveAdvice}>
          <span>GIVE ME ADVICE!</span>
        </button>
      </div>
    </div>
  )
}

export default App
