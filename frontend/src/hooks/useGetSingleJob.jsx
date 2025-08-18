import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import { setSingleJob } from "@/redux/jobSlice";


const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {withCredentials:true});
                console.log("jobs Response:", res.data);
                if(res.data.success){
                    dispatch(setSingleJob(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchSingleJob();
    },[])
}

export default useGetSingleJob;