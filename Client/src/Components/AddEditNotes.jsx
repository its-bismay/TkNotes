import React from 'react'

const AddEditNotes = () => {
  return (
    <div>
        <div className="flex flex-col gap-2">
            <label className='input-lable'>TITLE</label>
            <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Do Your Project'/>
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className='input-lable'>CONTENT</label>
            <textarea type="text" className='text-sm text-slate-950 outline-none bg-slate-100 rounded p-2' placeholder='write your content here...' rows={7}></textarea>
        </div>

        <div className="mt-3">
            <label className='input-lable'>TAGS</label>
        </div>

        <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
    </div>
  )
}

export default AddEditNotes