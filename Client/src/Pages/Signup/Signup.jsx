import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';
import { validateEmail } from '../../Utils/Helper';
import Password from '../../Components/Password';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Utils/axiosInstance';

const Signup = () => {
  const navigate = useNavigate()

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

    try {
      const response = await axiosInstance.post("/register", {
          email: email,
          password: password,
          fullName: name
      });

  //Handle successfull register response
  if(response.data && response.data.error){
    setError(response.data.message)
    return
  }

  if(response.data && response.data.accessToken){
      localStorage.setItem("token", response.data.accessToken)
      navigate("/home")
  }
  } catch (error) {
      //handle error
      if (error.response && error.response.data && error.response.data) {
          setError(error.response.data.message)
      } else {
          setError("An unexpected error occurred. Please try again.")
      }
  }
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