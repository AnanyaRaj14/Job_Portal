import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";

const useGetAllAdminJobs = (adminID) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async (adminId) => {
            try {
                console.log("Fetching jobs for adminId:", adminId);
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true,
                    params: { adminId },
                });
                console.log("jobs Response:", res.data);
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (adminID) fetchAllAdminJobs(adminID);
    }, [adminID, dispatch]);
};

export default useGetAllAdminJobs;
