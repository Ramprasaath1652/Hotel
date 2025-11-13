import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // ✅ for the eye icons
import { useNavigate } from 'react-router-dom';



const LoginCard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const correctUsername = 'admin';
        const correctPassword = '1234';

        if (
            formData.username === correctUsername &&
            formData.password === correctPassword
        ) {
            navigate('/home')
        } else {
            setLoginError('Invalid username or password')
        }
    }



    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "350px" }}>
                <div className="text-center mb-3">
                    <img
                        src="https://www.clipartkey.com/mpngs/m/123-1233819_logo-icon-svg-clip-arts-circle.png"
                        alt="Logo"
                        className='img-fluid'
                        style={{ maxHeight: '80px', objectFit: 'contain' }}
                    />
                    <h4 className="fw-semibold">Login</h4>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                    </div>

                    {/* Password with Eye Icon */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className={`form-control pe-5 ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <i
                                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute end-0 me-3 text-secondary`}
                                style={{
                                    cursor: "pointer",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 5,
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>
                    </div>


                    {/*Login Error */}
                    {loginError && (
                        <div className="text-danger mb-3 text-center"></div>
                    )}

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginCard;