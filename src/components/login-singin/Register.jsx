import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from '../assets/login_img.png';
import apiUrl from '../../Axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};
    
        // Name
        if (!formData.name) {
            formIsValid = false;
            errors.name = 'Name cannot be empty';
        } else if (formData.name.length < 3 || formData.name.length > 20) {
            formIsValid = false;
            errors.name = 'Name must be between 3 and 20 characters long';
        }
    
        // Mobile
        if (!formData.mobileNumber) {
            formIsValid = false;
            errors.mobileNumber = 'Mobile number cannot be empty';
        } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
            formIsValid = false;
            errors.mobileNumber = 'Invalid mobile number. It should start with 9, 8, 7, or 6 and be 10 digits long';
        }
    
        // Email
        if (!formData.email) {
            formIsValid = false;
            errors.email = 'Email cannot be empty';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formIsValid = false;
            errors.email = 'Invalid email address';
        }
    
        
    
        // Password
        if (!formData.password) {
            formIsValid = false;
            errors.password = 'Password cannot be empty';
        } else if (
            !/(?=.*[a-z])/.test(formData.password) || // at least one lowercase letter
            !/(?=.*[A-Z])/.test(formData.password) || // at least one uppercase letter
            !/(?=.*\d)/.test(formData.password) || // at least one number
            !/(?=.*[@$!%*?&])/.test(formData.password) || // at least one special character
            formData.password.length < 8 // at least 8 characters long
        ) {
            formIsValid = false;
            errors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
    
        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            formIsValid = false;
            errors.confirmPassword = 'Passwords do not match';
        }
    
        setErrors(errors);
        return formIsValid;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const response = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Registration successful');
                    navigate('/login');
                } else {
                    alert(result.error);
                }
            } catch (error) {
                alert('Error submitting form');
            }
        } else {
            alert('Form has errors');
        }
    };

    return (
        <section>
            <div className="h-full">
                <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-2 mt-12 grow-0 basis-auto md:mt-16 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img src={loginimg} className="w-full" alt="Login Illustration" />
                    </div>

                    <div className="mb-12 md:mt-8 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-12">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-row mt-16 items-center justify-center sm:justify-center lg:justify-start">
                                <p className="mb-0 me-4  text-lg font-bold">Sign up with</p>

                                <button type="button" className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                        </svg>
                                    </span>
                                </button>

                                <button type="button" className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                        </svg>
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="mx-1 inline-block h-9 w-9 rounded-full bg-primary fill-black p-2 uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                                    <span className="[&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3c94 0 111.3 61.9 111.3 142.3V448z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-black">Or</p>
                            </div>

                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm">{errors.name}</div>
                                )}
                            </div>

                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    placeholder="Mobile Number"
                                />
                                {errors.mobileNumber && (
                                    <div className="text-red-500 text-sm">{errors.mobileNumber}</div>
                                )}
                            </div>

                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email address"
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </div>

                            

                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <div className="text-red-500 text-sm">{errors.password}</div>
                                )}
                            </div>

                            <div className="relative mb-6" data-twe-input-wrapper-init>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none dark:text-black"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && (
                                    <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                                )}
                            </div>

                            <div className="mb-6 flex items-center justify-between">
                                <button type="submit" className="inline-block w-full rounded bg-blue-700 px-7 py-3 text-md font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2">
                                    Sign Up
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="mb-0 text-sm font-semibold dark:text-black">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-red-700 text-lg pl-1 hover:underline hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-600">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
