import React from 'react'
import Home from './Pages/Home/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'


const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/register' exact element={<Signup/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App
