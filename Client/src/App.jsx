import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Dashboard from './Pages/Dashboard/Dashboard'


const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Dashboard/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/register' exact element={<Signup/>}/>
      <Route path='/home' exact element={<Dashboard/>}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>{routes}</div>
  )
}

export default App
