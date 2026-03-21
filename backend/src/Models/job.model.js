import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobId: String,
    type: String, 
    status: String,
    progress: Number,
    result: Object,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Job", jobSchema);