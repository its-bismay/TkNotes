import React, { useState } from 'react'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'

const Navbar = () => {
  const Navigate = useNavigate()

  const [query, setQuery] = useState("")

  const onLogout = () => {
    Navigate("/login")
  }

  const onClearSearch = () => {
    setQuery("")
  }

  const handleSearch = () => {

  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg'>
        <h2 className='text-2xl text-primary font-semibold text-black py-2'>TkNotes</h2>
        <Searchbar onClearSearch={onClearSearch} handleSearch={handleSearch} value={query} onChange={({target}) => {
          setQuery(target.value)
        }}></Searchbar>
        <Profile onLogout={onLogout}></Profile>
    </div>
  )
}

export default Navbar