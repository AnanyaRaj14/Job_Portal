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
                console.log("Decoded token:", decodedToken?.userId);
                setDecoded(decodedToken);
            } catch (err) {
                console.error("Invalid token", err);
            }
        };

        getUserData();
    }, [cookies]);
    console.log(decoded?.userId);
    useGetAllAdminJobs(decoded?.userId);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className="w-fit"
                        placeholder="Filter by name, role"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                </div>
                <AdminJobsTable filterText={input} />
            </div>
        </div>
    );
};

export default AdminJobs;
