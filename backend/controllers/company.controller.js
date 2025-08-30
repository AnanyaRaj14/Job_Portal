import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, userId } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check for duplicate company name
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(409).json({
                message: "A company with this name already exists.",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};

// get company by logged in userId
export const getCompany =  async (req, res) => {
    try {
        // const userId = req.body; //logged in user id
        const companies = await Company.find({});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
         res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// get company by ID
export const getCompanyById = async (req, res) => {
    try {
       const companyId = req.params.id;
       const company = await Company.findById(companyId);
       if(!company){
            return res.status(404).json({
                message:"Company not found",
                success: false
            });
       }
       return res.status(200).json({
        company,
        success:true
       })
    } catch (error) {
        console.log(error);  
    }
}

// update company information
export const updateCompany = async (req, res) => {
    try {
       const {name, description, website, location} = req.body;
       const file = req.file;
    //    cloudinary space left

        const updateData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true});

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}
