// import "./App.css";
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { history } from './Redux/Store'
import React from 'react'
function App() {
  return (
    <BrowserRouter history={history}>
      <Routes />
    </BrowserRouter>
  )
}

export default App
