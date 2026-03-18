import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const ResumeDetails = () => {
    const { id } = useParams();
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            const res = await API.get(`/resume/${id}`);
            setResume(res.data);
        };

        fetchResume();
    }, [id]);

    if (!resume) return <p>Loading...</p>;

    const data = resume.analysis;

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">📄 Resume Details</h1>

            <p className="text-gray-500">Uploaded: {new Date(resume.createdAt).toLocaleString()}</p>

            {/* Skills */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">✅ Skills</h2>
                <ul className="list-disc ml-5">
                    {data?.skills?.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>

            {/* Missing Skills */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">⚠️ Missing Skills</h2>
                <ul className="list-disc ml-5">
                    {data?.missingSkills?.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">💡 Suggestions</h2>
                <ul className="list-disc ml-5">
                    {data?.suggestions?.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResumeDetails;
