import { Job } from "../models/job.model.js";

// Post a new job (Admin only)
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId, userId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }
        console.log(req.body);

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experienceLevel),
            position: Number(position),
            company: companyId,
            userId
        });


        return res.status(201).json({
            message: "New job created successfully.",
            job,
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
        console.log(jobId);
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
        console.log(adminId);
        const jobs = await Job.find({ userId: adminId })  // ✅ changed created_by → userId
            .populate("company")
            .sort({ createdAt: -1 });
        if(jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

