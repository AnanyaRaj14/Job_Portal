import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Sun, Moon, Menu, X } from 'lucide-react'
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

    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    };

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
            toast.error(error.response.data.message);
        }
    };

    const menuLinks = user?.role === 'recruiter'
        ? [{ label: 'Companies', to: '/admin/companies' }, { label: 'Jobs', to: '/admin/jobs' }]
        : [{ label: 'Home', to: '/' }, { label: 'Jobs', to: '/jobs' }, { label: 'Browse', to: '/browse' }];

    return (
        <nav className='bg-white dark:bg-gray-900 dark:text-white sticky top-0 z-50 shadow-md transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>

                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 select-none cursor-default'>
                        ElevateHire
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6'>
                        {menuLinks.map(link => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className="relative text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                                    {link.label}
                                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-500 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle */}
                    <Button variant="ghost" onClick={toggleTheme} className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800 dark:text-gray-100" />}
                    </Button>

                    {/* Auth Buttons */}
                    {!user ? (
                        <div className='flex flex-col sm:flex-row items-center gap-3'>
                            {/* Login Button */}
                            <Link to="/login">
                                <Button className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm transition-all duration-300 w-full sm:w-auto">
                                    Login
                                </Button>
                            </Link>

                            {/* Signup Button */}
                            <Link to="/signup">
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white dark:text-white rounded-lg shadow-sm transition-all duration-300 w-full sm:w-auto">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer shadow-md">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 dark:bg-gray-800 dark:text-white shadow-lg">
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className="cursor-pointer shadow-md">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-gray-400 dark:text-gray-300'>{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col my-2 text-gray-600 dark:text-gray-300 gap-2'>
                                    {user.role === 'student' && (
                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                    )}
                                    <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className='md:hidden flex items-center gap-2'>
                    <Button variant="ghost" onClick={toggleTheme} className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-800 dark:text-gray-100" />}
                    </Button>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='md:hidden bg-white dark:bg-gray-900 shadow-lg backdrop-blur-sm p-4 space-y-3'>
                    {menuLinks.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="block text-gray-700 dark:text-gray-200 py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">{link.label}</Link>
                    ))}

                    {!user ? (
                        <div className='flex flex-col gap-2 mt-2'>
                            <Link to="/login" onClick={() => setMenuOpen(false)}><Button className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">Login</Button></Link>
                            <Link to="/signup" onClick={() => setMenuOpen(false)}><Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300">Signup</Button></Link>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 mt-2'>
                            {user.role === 'student' && <Button variant="link" onClick={() => setMenuOpen(false)}><Link to="/profile">View Profile</Link></Button>}
                            <Button variant="link" onClick={() => { logoutHandler(); setMenuOpen(false); }}>Logout</Button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
