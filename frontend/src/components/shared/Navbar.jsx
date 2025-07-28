import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  const user = false;

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Elevate<span className="text-[#F83002]">Hire</span>
          </h1>
        </div>

        {/* Navigation Links + Auth */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link
                to="/"
                className="relative px-2 py-1 rounded transition duration-300 hover:text-[#6A38C2] hover:shadow-md 
                before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#6A38C2] before:transition-all before:duration-300 hover:before:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="relative px-2 py-1 rounded transition duration-300 hover:text-[#6A38C2] hover:shadow-md 
                before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#6A38C2] before:transition-all before:duration-300 hover:before:w-full"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="relative px-2 py-1 rounded transition duration-300 hover:text-[#6A38C2] hover:shadow-md 
                before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] 
                before:bg-[#6A38C2] before:transition-all before:duration-300 hover:before:w-full"
              >
                Browse
              </Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="transition duration-300 hover:shadow-md hover:border-[#6A38C2] hover:text-[#6A38C2]"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition duration-300 shadow hover:shadow-lg">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:shadow-md transition duration-300">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Ananya Raj</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#6A38C2]">
                    <User2 />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer hover:text-[#F83002]">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
