import React, { useState } from 'react'
import Taginput from './Taginput'
import { MdClose } from "react-icons/md"; 

const AddEditNotes = ({onClose}) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  return (
    <div className='relative'>

        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
          <MdClose className='text-xl text-slate-400'/>
        </button>

        <div className="flex flex-col gap-2">
            <label className='input-lable'>TITLE</label>
            <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Title of the Note' value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className='input-lable'>CONTENT</label>
            <textarea type="text" className='text-sm text-slate-950 outline-none bg-slate-100 rounded p-2' placeholder='write your content here...' rows={7} value={content} onChange={({target}) => setContent(target.value)}></textarea>
        </div>

        <div className="mt-3">
            <label className='input-lable'>TAGS</label>
            <Taginput tags={tags} setTags={setTags}></Taginput>
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
  )
}

export default AddEditNotes