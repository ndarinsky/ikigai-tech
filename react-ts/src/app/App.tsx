import { useState } from 'react'
import './App.css'
import UsersPage from '../presentation/pages/UserPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2> Ikigai </h2>
      <UsersPage />
    </>
  )
}

export default App
