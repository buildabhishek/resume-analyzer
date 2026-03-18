// client/src/pages/Upload.jsx

import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [role, setRole] = useState('Software Engineer');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file) return alert('Please select a file');

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('resume', file);
            formData.append('role', role);

            await API.post('/resume/upload', formData);

            alert('Resume analyzed successfully!');

            navigate('/dashboard'); // redirect
        } catch (error) {
            console.error(error);
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Upload Resume</h1>

            {/* ROLE SELECT */}
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded"
            >
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Data Scientist</option>
            </select>

            {/* FILE INPUT */}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            {/* BUTTON */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                    loading ? 'bg-gray-400' : 'bg-blue-500'
                }`}
            >
                {loading ? 'Analyzing...' : 'Upload Resume'}
            </button>
        </div>
    );
};

export default Upload;
