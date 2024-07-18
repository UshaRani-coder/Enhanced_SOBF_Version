import React from 'react'
import { lazy } from 'react'
import './index.css'; 


const HomePage = lazy(() => import("./Pages/HomePage"));

const App = () => {
  return (
    <div>
      <HomePage/>
    </div>
  )
}

export default App
