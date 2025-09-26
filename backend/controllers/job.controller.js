import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

// Post a new job (Admin only)
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const authenticatedUserId = req.id || req.body.userId; 

        if (!authenticatedUserId) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Validate company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        // Optional: ensure the authenticated user owns the company (admin creating jobs)
        if (company.userId?.toString() !== authenticatedUserId.toString()) {
            return res.status(403).json({
                message: "You are not authorized to post jobs for this company.",
                success: false
            });
        }

        // Normalize inputs
        const normalizedRequirements = Array.isArray(requirements)
            ? requirements
            : String(requirements)
                .split(",")
                .map((reqItem) => reqItem.trim())
                .filter((reqItem) => reqItem.length > 0);

        const parsedSalary = Number(salary);
        const parsedExperienceLevel = Number(experienceLevel);
        const parsedPosition = Number(position);

        if (Number.isNaN(parsedSalary) || Number.isNaN(parsedExperienceLevel) || Number.isNaN(parsedPosition)) {
            return res.status(400).json({
                message: "Invalid numeric fields: salary, experienceLevel, or position.",
                success: false
            });
        }

        const job = await Job.create({
            title: title.trim(),
            description: description.trim(),
            requirements: normalizedRequirements,
            salary: parsedSalary,
            location: location.trim(),
            jobType: jobType.trim(),
            experienceLevel: parsedExperienceLevel,
            position: parsedPosition,
            company: companyId,
            userId: authenticatedUserId
        });

        const populatedJob = await job.populate("company", "name location");


        return res.status(201).json({
            message: "New job created successfully.",
            job: populatedJob,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get all jobs (Student side)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query)
            .populate("company", "name location");


        console.log('Jobs fetched:', jobs);
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get job by ID (Student side)
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(req.params.id)
            .populate("company", "name location")   // only fetch needed fields
            .populate("applications");  // optional
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get jobs created by an admin (Admin side)
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ userId: adminId })  // ✅ changed created_by → userId
            .populate("company")
            .sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false,
            });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};



