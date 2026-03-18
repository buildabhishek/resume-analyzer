import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);

    // 1. Fetch resumes on mount
    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await API.get('/resume');
                setResumes(res.data);
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };
        fetchResumes();
    }, []);

    // 2. Define handleDelete INSIDE the component to access state
    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevents the card's onClick (navigation) from firing
        if (!window.confirm('Are you sure you want to delete this resume?')) return;

        try {
            await API.delete(`/resume/${id}`);
            setResumes(resumes.filter((r) => r._id !== id));
        } catch (error) {
            console.error('Error deleting resume:', error);
            alert('Failed to delete the resume.');
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">📄 Resume History</h1>

            <div className="space-y-4">
                {resumes.map((resume) => (
                    <div
                        key={resume._id}
                        onClick={() => navigate(`/resume/${resume._id}`)}
                        className="group relative bg-white shadow p-5 rounded cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-blue-300"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500">
                                    {new Date(resume.createdAt).toLocaleString()}
                                </p>
                                <h2 className="text-lg font-semibold text-blue-600">
                                    {resume.fileName}
                                </h2>
                            </div>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={(e) => handleDelete(e, resume._id)}
                                className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-colors text-sm"
                            >
                                Delete
                            </button>
                        </div>

                        <div className="mt-2">
                            <strong className="text-sm">Skills identified:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {resume.analysis?.skills?.map((s, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {resumes.length === 0 && (
                    <p className="text-gray-500">No resumes found. Upload one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default History;
