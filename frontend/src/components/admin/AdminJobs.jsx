import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const AdminJobs = () => {
    const [input, setInput] = useState("");
    const [decoded, setDecoded] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies] = useCookies();

    useEffect(() => {
        const getUserData = async () => {
            try {
                if (!cookies.token) return;
                const decodedToken = jwtDecode(cookies.token);
                setDecoded(decodedToken);
            } catch (err) {
                console.error("Invalid token", err);
            }
        };
        getUserData();
    }, [cookies]);

    useGetAllAdminJobs(decoded?.userId);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
                {/* Filter & New Job Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Input
                        className="w-full sm:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 rounded-md"
                        placeholder="Filter by name or role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors rounded-md"
                    >
                        New Jobs
                    </Button>
                </div>

                {/* Admin Jobs Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                    <AdminJobsTable filterText={input} />
                </div>
            </div>
        </div>
    );
};

export default AdminJobs;
