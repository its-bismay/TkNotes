import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Password from '../../Components/Password'
import { validateEmail } from '../../Utils/Helper'
import axiosInstance from '../../Utils/axiosInstance'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("please enter a valid email address.")
            return;
        }

        if(!password) {
            setError("please enter password")
            return;
        }

        setError("");

        //login api call
        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

        //Handle successfull login response
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
                <form onSubmit={handleLogin}>
                    <h4 className='text-2xl mb-7 font-medium'>Login</h4>
                    <input type="text" placeholder='Email' className='input-box' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)}></Password>
                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                    <button type="submit" className='btn-primary'>Login</button>
                    <p className="text-sm text-center mt-4">
                        Not registered yet? {" "}
                        <Link to="/register" className="font-medium text-primary underline">Click Here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login