import React, { useState } from 'react'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar'

const Navbar = ({userInfo, onSearch, handleClearSearch}) => {
  const Navigate = useNavigate()

  const [query, setQuery] = useState("")

  const onLogout = () => {
    localStorage.clear()
    Navigate("/login")
  }

  const onClearSearch = () => {
    setQuery("")
    handleClearSearch()
  }

  const handleSearch = () => {
    if(query){
      onSearch(query)
    }
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-lg'>
        <h2 className='text-2xl text-primary font-semibold py-2'>TkNotes</h2>
        {userInfo &&<Searchbar onClearSearch={onClearSearch} handleSearch={handleSearch} value={query} onChange={({target}) => {
          setQuery(target.value)
        }}></Searchbar>}
        {userInfo && <Profile userInfo={userInfo} onLogout={onLogout}></Profile>}
    </div>
  )
}

export default Navbar