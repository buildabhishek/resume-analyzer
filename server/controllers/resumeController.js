// controllers/resumeController.js

import Resume from '../models/Resume.js';
import { extractTextFromPDF } from '../utils/pdfParser.js';
import { analyzeResume } from '../utils/ai.js';
import fs from 'fs';

// UPLOAD
export const uploadResume = async (req, res) => {
    try {
        console.log('FILE RECEIVED:', req.file);

        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded. Field name should be "resume"',
            });
        }

        const filePath = req.file.path;

        const extractedText = await extractTextFromPDF(filePath);
        const role = req.body.role || 'Software Engineer';

        const aiResult = await analyzeResume(extractedText, role);
        if (!aiResult || typeof aiResult !== 'object') {
            throw new Error('AI analysis failed');
        }
        const resume = await Resume.create({
            user: req.user ? req.user.id : null,
            fileName: req.file.filename,
            filePath,
            extractedText,
            analysis: aiResult,
        });

        res.status(200).json({
            message: 'Resume saved & analyzed successfully',
            resume,
        });
    } catch (error) {
        console.error('SERVER ERROR:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
export const getUserResumes = async (req, res) => {
    try {
        const query = req.user ? { user: req.user.id } : {};
        const resumes = await Resume.find(query).sort({ createdAt: -1 });

        res.status(200).json(resumes);
    } catch (error) {
        console.error('FETCH ERROR:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE (FIXED)
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // 🔥 delete file from uploads
        if (resume.filePath && fs.existsSync(resume.filePath)) {
            fs.unlinkSync(resume.filePath);
        }

        await resume.deleteOne();

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('DELETE ERROR:', error.message);
        res.status(500).json({ message: error.message });
    }
};
