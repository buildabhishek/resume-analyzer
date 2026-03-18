import { Routes, Route } from 'react-router-dom';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Navbar from './components/Navbar';
import ResumeDetails from './pages/ResumeDetails';


function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Upload />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/resume/:id" element={<ResumeDetails />} />;
            </Routes>
        </>
    );
}

export default App;
