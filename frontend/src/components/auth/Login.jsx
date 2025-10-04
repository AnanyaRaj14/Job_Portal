import React, { useEffect, useState } from 'react'
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

  const { loading, user } = useSelector(store => store.auth)
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
        console.log('Login successful:', res.data.token);
        setCookie("token", res.data?.token);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />

      {/* Centered Container */}
      <div className="flex items-center justify-center px-4 py-10 sm:py-16">
        <form 
          onSubmit={submitHandler} 
          className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 sm:p-8"
        >
          <h1 className="font-bold text-2xl text-center text-gray-800 dark:text-gray-100 mb-6">Login</h1>

          {/* Email */}
          <div className="my-3">
            <Label className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="mt-1"
              required
            />
          </div>

          {/* Password */}
          <div className="my-3">
            <Label className="text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="my-5">
            <Label className="text-gray-700 dark:text-gray-300 block mb-2">Select Role</Label>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-400">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="text-gray-600 dark:text-gray-400">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Button */}
          {
            loading ? (
              <Button className="w-full my-4 flex items-center justify-center gap-2 bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full my-4 bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
              >
                Login
              </Button>
            )
          }

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-3">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#6A38C2] hover:underline">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
