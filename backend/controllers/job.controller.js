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
        const job = await Job.findById(req.params.id).populate({
            path:"applications"
        })
            // .populate("company", "name location")   // only fetch needed fields
            // .populate("applications");  // optional

            console.log('jobs in backend : ', job);

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

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

