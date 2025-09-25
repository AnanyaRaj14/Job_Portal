import React, { useEffect } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT} from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";


const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
                console.log("jobs Response:", res.data);
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);   
            }
        }
        fetchCompanies();
    },[])
    return;
}
export default useGetAllCompanies;