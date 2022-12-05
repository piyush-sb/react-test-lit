import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MyTracker from './MyTracker';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <MyTracker/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
