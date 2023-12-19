import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [flavors, setNewFlavors] = useState([])

  useEffect(() => {
    const fetchFlavors = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/flavors')
      setNewFlavors(response.data)
    } catch (error) {
      console.log('Error grabbing flavors')
    }
  } 
  fetchFlavors() 
}, [])

  return (
    <div>
      <h1>Welcome to the Ice Cream Store!</h1>
      <h2>Here are the flavors listed:</h2>
      <ul>
        {flavors.map((flavor) => (
          <li key={flavor.id}>
            <p>{flavor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
