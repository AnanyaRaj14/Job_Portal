import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: 0,
    companyId: "",
    userId: "",
  });

  const [tokenData, setTokenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [Cookies] = useCookies();

  const getUserData = async () => {
    try {
      if (!Cookies?.token) return;
      const decoded = jwtDecode(Cookies.token);
      setTokenData(decoded);
    } catch (err) {
      console.log("Failed to decode token", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const createJobPost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...input, userId: tokenData?.userId };
      const res = await axios.post(`${JOB_API_END_POINT}/post`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput((prev) => ({
      ...prev,
      companyId: selectedCompany._id,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex justify-center px-4 py-10">
        <form
          onSubmit={createJobPost}
          className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 sm:p-10 border border-gray-200 dark:border-gray-700 transition-all"
        >
          <h1 className="text-2xl font-bold text-center sm:text-left text-gray-800 dark:text-white mb-6">
            Post a New Job
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-center sm:text-left">
            Fill in the details below to create a new job posting.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className=" mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Requirements
              </Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Job Type
              </Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Experience
              </Label>
              <Input
                type="text"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                No. of Positions
              </Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="mb-4 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {companies && companies.length > 0 && (
              <div className="sm:col-span-2">
                <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                  Select Company
                </Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200"
            >
              {loading ? "Posting..." : "Post New Job"}
            </Button>
          </div>

          {!companies || companies.length === 0 ? (
            <p className="text-red-500 text-center mt-4">
              No companies found. Please create a company first.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
