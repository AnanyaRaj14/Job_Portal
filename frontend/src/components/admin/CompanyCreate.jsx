import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  const decoded = jwtDecode(cookies.token);
  const userId = decoded.userId;
  console.log(userId);

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name.");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName, userId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-12 px-6 sm:px-8 md:px-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200 dark:border-gray-700">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Your Company Name
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
              What would you like to name your company? You can change this later.
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-gray-700 dark:text-gray-300">
              Company Name
            </Label>
            <Input
              type="text"
              className="my-2 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Google, Microsoft, Paytm etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end sm:items-center gap-3 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies/")}
              className="w-full sm:w-auto border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
