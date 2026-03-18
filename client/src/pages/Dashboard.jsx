// src/pages/Dashboard.jsx

import { useEffect, useState } from 'react';
import API from '../services/api';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/resume');

                if (res.data && res.data.length > 0) {
                    // latest resume
                    setData(res.data[0].analysis);
                } else {
                    setData(null);
                }
            } catch (error) {
                console.error('Dashboard fetch error:', error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="p-10">Loading...</p>;

    if (!data) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold">No Data Found</h1>
                <p className="text-gray-500 mt-2">Upload a resume to see analysis.</p>
            </div>
        );
    }

    const score = data.score || 0;

    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">📊 Resume Analysis</h1>

            {/* SCORE */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold mb-2">ATS Score</h2>

                <div className="w-full bg-gray-200 rounded h-4">
                    <div
                        className={`h-4 rounded ${
                            score > 70
                                ? 'bg-green-500'
                                : score > 40
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                        }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>

                <p className="mt-2 font-bold">{score}/100</p>
            </div>

            {/* SKILLS */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">✅ Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.skills?.map((s, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded">
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            {/* MISSING SKILLS */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">⚠️ Missing Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.missingSkills?.map((s, i) => (
                        <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded">
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            {/* SUGGESTIONS */}
            <div className="bg-white shadow p-5 rounded">
                <h2 className="text-xl font-semibold">💡 Suggestions</h2>
                <ul className="list-disc ml-5 mt-2">
                    {data.suggestions?.map((s, i) => (
                        <li key={i}>{s}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
