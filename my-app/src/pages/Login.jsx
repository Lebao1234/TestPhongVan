import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                Email,
                Password
            });

            localStorage.setItem('token', response.data.token);
            alert('Đăng nhập thành công');
            navigate('/dashboard'); // Điều hướng sang dashboard sau khi login
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Đăng Nhập</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Đăng Nhập</button>
                </form>
                <p style={styles.text}>
                    Chưa có tài khoản? <a href="/register" style={styles.link}>Đăng ký ngay</a>
                </p>
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
        background: 'linear-gradient(to right, #000208ff, #03e1daff)',
        fontFamily: 'sans-serif'
    },
    card: {
        backgroundColor: 'transparent',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    title: {
        marginBottom: '20px',
        color: '#f7f1f1ff'
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
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '12px',
        backgroundColor: '#21e0e0ff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    text: {
        marginTop: '15px',
        fontSize: '14px',
        color: '#1ccadaff'
    },
    link: {
        color: '#22dfd6ff',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default Login;
