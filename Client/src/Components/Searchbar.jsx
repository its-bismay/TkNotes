import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const Searchbar = ({value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-200 rounded-sm'>
        <input type="text" className='w-full text-sm bg-transparent py-[10px] outline-none' placeholder="Search Notes" value={value} onChange={onChange}/>
        {value && <IoMdClose size={25} className='text-primary mr-3' onClick={onClearSearch}></IoMdClose>}
        <FaMagnifyingGlass size={20} className='text-primary' onClick={handleSearch}></FaMagnifyingGlass>
    </div>
  )
}

export default Searchbar