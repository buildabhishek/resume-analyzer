// server/utils/ai.js

import { GoogleGenerativeAI } from '@google/generative-ai';

export const analyzeResume = async (text, role = 'Software Engineer') => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });

        const prompt = `
You are an ATS system evaluating a resume for the role: ${role}.

Evaluate based on REALISTIC industry expectations for an entry-level to mid-level candidate.

IMPORTANT RULES:
- Do NOT assume senior-level requirements
- Only list missing skills if they are truly essential for this role
- If the resume is already strong, return fewer missing skills
- Be fair and practical, not overly strict

Return ONLY valid JSON:

{
  "skills": [],
  "missingSkills": [],
  "suggestions": [],
  "score": number
}

Resume:
${text}
`;
        const result = await model.generateContent(prompt);
        const rawText = result.response.text();

        const jsonMatch = rawText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error('Invalid AI response');
        }

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error('AI ERROR:', error.message);

        return {
            skills: ['Communication', 'Problem Solving'],
            missingSkills: ['Add more technical skills'],
            suggestions: ['Improve resume formatting'],
            score: 50,
        };
    }
};
