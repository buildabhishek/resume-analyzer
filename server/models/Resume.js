import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        fileName: String,
        filePath: String,
        extractedText: String,
        analysis: {
            skills: [String],
            missingSkills: [String],
            suggestions: [String],
            score: Number,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
