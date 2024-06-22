import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';
import { validateEmail } from '../../Utils/Helper';
import Password from '../../Components/Password';
import { Link } from 'react-router-dom'

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [name, setName] = useState("")


  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
      setError("please enter a name")
      return;
    }

    if(!validateEmail(email)) {
        setError("please enter a valid email address.")
        return;
    }

    if(!password) {
        setError("please set a password")
        return;
    }

    setError("")
}
  return (
    <div className='min-h-screen bg-loginbg bg-bottom bg-no-repeat'>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
          <div className="w-96 border rounded bg-white px-7 py-10 drop-shadow-lg">
              <form onSubmit={handleSignup}>
                  <h4 className='text-2xl mb-7 font-medium'>Register</h4>
                  <input type="text" placeholder='Name' className='input-box' value={name} onChange={(e) => setName(e.target.value)}/>
                  <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <Password value={password} onChange={(e) => setPassword(e.target.value)}></Password>
                  {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                  <button type="submit" className='btn-primary'>Create Account</button>
                  <p className="text-sm text-center mt-4">
                        Already have an account? {" "}
                        <Link to="/login" className="font-medium text-primary underline">Login</Link>
                  </p>
              </form>
          </div>
      </div>    
    </div>
  )
}

export default Signup;