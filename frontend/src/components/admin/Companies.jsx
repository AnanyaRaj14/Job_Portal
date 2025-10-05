import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Input
              className="w-full sm:w-1/2 md:w-1/3 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="🔍 Filter by company name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-5 py-2 transition-all"
            >
              + New Company
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all">
            <CompaniesTable filterText={input} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
