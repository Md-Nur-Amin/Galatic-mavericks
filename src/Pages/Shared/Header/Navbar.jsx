import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navItems = <>
    <Link className='font-bold mr-5 relative  hover:text-orange-500 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-800 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]' to='/'>Home</Link>

    <Link className='font-bold  mr-5 relative  hover:text-orange-500 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'  to='/about'> About</Link>

    <Link className='font-bold  mr-5 relative  hover:text-orange-500 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]'  to='/solarSystem'> SolarSystem </Link>


    
    </>
    return (
        <div>
            <div>
                <div className="navbar bg-">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li>
                                    <a>Parent</a>
                                    <ul className="p-2">
                                    {navItems}
                                    </ul>
                                </li>
                               
                            </ul>
                        </div>
                        <Link to='/' className="btn btn-ghost text-xl">daisyUI</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            
                            {navItems}
                           
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;