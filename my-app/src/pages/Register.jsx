import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Password !== ConfirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                Firstname,
                Lastname,
                Email,
                Password
            });

            alert('Đăng ký thành công!');
            navigate('/login');
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Firstname"
                        value={Firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Lastname"
                        value={Lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="ConfirmPassword"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Create Account</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #000d10ff, #13ada1ff)',
        fontFamily: 'sans-serif'
    },
    card: {
        backgroundColor: 'transparent',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
    },
    title: {
        marginBottom: '20px',
        color: '#f2f7f9ff'
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        fontSize: '14px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        color: 'white',
        borderRadius: '4px',
        border: '1px solid #f7efefff',
        backgroundColor: 'transparent',
    },
    button: {
        padding: '12px',
        backgroundColor: '#1bc0c0ff',
        color: 'black',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    text: {
        marginTop: '15px',
        fontSize: '14px',
        color: '#f7f0f0ff'
    },
    link: {
        color: '#e4edecff',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default Register;
