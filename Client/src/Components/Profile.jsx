import React from 'react'
import { getInitials } from '../Utils/Helper'

const Profile = ({onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center text-xl justify-center rounded-full text-white font-medium bg-primary'>{getInitials("Bismay Bibhabasu")}</div>
        <div>
            <button className='text-lg text-primary underline' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Profile