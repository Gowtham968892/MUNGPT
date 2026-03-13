import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { axios, setToken } = useAppContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = state === "login" ? '/api/user/login' : '/api/user/register'

    try {
      const { data } = await axios.post(url, { name, email, password })
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 
        p-8 py-12 w-80 sm:w-[360px] 
        text-gray-300 
        rounded-3xl 
        shadow-2xl 
        border border-white/10 
        bg-white/5 
        backdrop-blur-xl"
      >

        <p className="text-2xl font-semibold text-center text-white">
          <span className="text-blue-400">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="text-sm text-gray-400">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="border border-white/10 bg-white/5 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-600 text-white"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-sm text-gray-400">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border border-white/10 bg-white/5 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-600 text-white"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-sm text-gray-400">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="border border-white/10 bg-white/5 rounded-lg w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-600 text-white"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        )}

        <button
          type='submit'
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500
          hover:from-blue-700 hover:to-blue-600
          transition-all duration-300
          text-white w-full py-2 rounded-lg
          shadow-lg hover:shadow-blue-800/40"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>

      </form>

    </div>
  )
}

export default Login