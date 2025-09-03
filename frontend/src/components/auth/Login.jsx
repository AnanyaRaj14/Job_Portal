import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [cookies, setCookie] = useCookies();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setCookie("token", res.data?.token);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-1/2 lg:w-1/3 bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 my-10"
        >
          <h1 className="font-extrabold text-3xl text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Login
          </h1>

          {/* Email */}
          <div className="my-4">
            <Label className="text-gray-700 font-semibold">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="mt-1 border-2 border-indigo-300 focus:border-pink-400 transition rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="my-4">
            <Label className="text-gray-700 font-semibold">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="mt-1 border-2 border-indigo-300 focus:border-pink-400 transition rounded-xl"
            />
          </div>

          {/* Role */}
          <div className="my-6">
            <Label className="text-gray-700 font-semibold">Select Role</Label>
            <RadioGroup className="flex items-center gap-6 mt-3">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-pink-500"
                />
                <span className="text-gray-700">Student</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-indigo-500"
                />
                <span className="text-gray-700">Recruiter</span>
              </div>
            </RadioGroup>
          </div>

          {/* Button */}
          {
            loading ? (
              <Button
                disabled
                className="w-full my-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-2 rounded-xl"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold py-2 rounded-xl hover:scale-105 transition"
              >
                Login
              </Button>
            )
          }

          {/* Signup link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-pink-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
