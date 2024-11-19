import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Static roles and auth data
const authData = [
    { username: 'Bhargav', password: '1234', role: 'admin' },
    { username: 'John', password: '5678', role: 'user' },
    { username: 'Alice', password: 'abcd', role: 'admin' }
];

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // To navigate after login

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure the username and password are provided
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Find the user based on username and password
        const user = authData.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            onLogin(user.role); // Successfully login with the correct role
            setError(''); // Reset error message

            // Navigate to the appropriate dashboard based on role
            if (user.role === 'admin') {
                navigate('/admin-dash');
            } else if (user.role === 'user') {
                navigate('/user-dash');
            }
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ backgroundColor: '#242424', height: '100vh' }}
        >
            <div className="card" style={{ width: '400px', padding: '20px' }}>
                <h3 className="text-center mb-4" style={{color: 'red'}}>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
