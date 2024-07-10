import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import iphoneLogo from '../utils/iphone-logo.png'; // Adjust the path based on your project structure

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('signedJWT');
        navigate('/');
    };

    return (
        <nav className="bg-orange-500 p-4">
            <div className=" mx-auto flex justify-between items-center">
                {/* Logo on the left */}
                <Link to={'/'} className="flex items-center">
                    <img src={iphoneLogo} alt="iPhone Logo" className="h-9 w-12 mr-3" />
                    <span className="text-white text-lg font-bold">Iphone</span>
                </Link>

                <button
                    className="bg-white text-orange-500 hover:bg-yellow-400 hover:text-white px-4 py-2 rounded-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
