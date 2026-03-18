import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="flex justify-between p-4 bg-gray-900 text-white">
            <h1 className="font-bold">AI Resume Analyzer</h1>
            <div className="space-x-4">
                <Link to="/">Upload</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/history">History</Link>
            </div>
        </div>
    );
};

export default Navbar;
