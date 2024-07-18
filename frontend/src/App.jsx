import React, { Suspense } from 'react'
import { lazy } from 'react'
import './index.css'; 


const HomePage = lazy(() => import("./Components/pages/HomePage.jsx"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <HomePage/>
    </div>
    </Suspense>
  )
}

export default App
