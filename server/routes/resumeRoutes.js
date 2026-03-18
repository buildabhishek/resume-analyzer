import express from 'express';
import upload from '../middleware/upload.js';
import { uploadResume } from '../controllers/resumeController.js';
import { getUserResumes } from '../controllers/resumeController.js';
import { getResumeById } from '../controllers/resumeController.js';
import { deleteResume } from '../controllers/resumeController.js';



const router = express.Router();

router.post('/upload', upload.single('resume'), uploadResume);

router.get('/', getUserResumes);
router.get('/:id', getResumeById);
router.delete('/:id', deleteResume);

export default router;
