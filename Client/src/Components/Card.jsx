import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const Card = ({title, date, content, tags, isPinned, Edit, Delete, Pin}) => {
  return (
    <div className='border-2 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{date}</span>

            </div>

            <MdOutlinePushPin size={20} className={`icon-btn ${isPinned ? "text-primary" : 'text-slate-300'}`} onClick={Pin}></MdOutlinePushPin>

        </div>

        <p className='text-xs text-slate-500 mt-2'>{content?.slice(0, 60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-500'>{tags.map((item) => `#${item} `)}</div>
            <div className='flex items-center gap-2'>
                <MdCreate className='icon-btn hover:text-green-600' onClick={Edit}></MdCreate>
                <MdDelete className='icon-btn hover:text-red-600' onClick={Delete}></MdDelete>
            </div>
        </div>
    </div>
  )
}

export default Card