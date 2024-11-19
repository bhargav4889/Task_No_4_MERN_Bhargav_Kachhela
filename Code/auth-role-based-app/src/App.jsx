import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './login'; // Assuming Login is a separate component

// Admin Dashboard Component
const AdminDashboard = () => (
    <div className="container mt-5">
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin!</p>
    </div>
);

// User Dashboard Component
const UserDashboard = () => (
    <div className="container mt-5">
        <h2>User Dashboard</h2>
        <p>Welcome, User!</p>
    </div>
);

// Home Component
const Home = ({ userRole }) => {
    return (
        <div className="container text-center mt-5">
            <h1>Hello, {userRole === 'guest' ? 'Guest' : userRole}</h1>
            <h1>This is {userRole === 'guest' ? 'Guest' : userRole} By Default Page </h1>
            {userRole === 'guest' && (
                <Link to="/login">
                    <button className="btn btn-primary mt-3">Login</button>
                </Link>
            )}
        </div>
    );
};

const App = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'guest');

    const login = (role) => {
        localStorage.setItem('role', role);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('role');
        setUserRole('guest');
    };

    return (
        <Router>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <div className="ml-auto">
                        {userRole !== 'guest' && (
                            <button onClick={logout} className="btn btn-danger">Logout</button>
                        )}
                    </div>
                </div>
            </div>

            <Routes>
          
                <Route path="/" element={<Home userRole={userRole} />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route 
                    path="/admin-dash" 
                    element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/user-dash" 
                    element={userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
