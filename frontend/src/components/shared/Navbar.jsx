import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function Navbar() {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  }

  return (
    <div className="sticky top-0 z-50 shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Elevate<span className="text-yellow-300">Hire</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-white">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to='/admin/companies' className="hover:text-yellow-300 transition">Companies</Link>
                </li>
                <li>
                  <Link to='/admin/jobs' className="hover:text-yellow-300 transition">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/' className="hover:text-yellow-300 transition">Home</Link>
                </li>
                <li>
                  <Link to='/jobs' className="hover:text-yellow-300 transition">Jobs</Link>
                </li>
                <li>
                  <Link to='/browse' className="hover:text-yellow-300 transition">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons or Avatar */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="bg-white text-indigo-600 font-semibold hover:bg-yellow-300 hover:text-indigo-800 transition">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-yellow-400 text-indigo-900 font-semibold hover:bg-yellow-500 transition">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-yellow-300 shadow-md hover:scale-105 transition">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-xl rounded-xl p-4">
                <div className="flex gap-4 items-center border-b pb-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col mt-3 text-gray-700">
                  {user?.role === 'student' && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
