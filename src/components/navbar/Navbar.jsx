import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../searchbar/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase/firebaseCongif';
import ResponsiveNavbar from './ResponsiveNavbar';
import { IoClose } from "react-icons/io5";


const Navbar = () => {
    const [isCategoriesDropdownVisible, setCategoriesDropdownVisible] = useState(false);
    const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const user = JSON.parse(localStorage.getItem('users'));

    const navigate = useNavigate();
    const accoutnRef = useRef(null);


    const toggleCategoriesDropdown = () => {
        setCategoriesDropdownVisible(!isCategoriesDropdownVisible);
        logEvent(analytics, 'categories_dropdown_toggle', {
            visible: !isCategoriesDropdownVisible,
        });
    };

    const toggleAccountDropdown = () => {
        setAccountDropdownVisible(!isAccountDropdownVisible);
        logEvent(analytics, 'account_dropdown_toggle', {
            visible: !isAccountDropdownVisible,
        });
    };

    const handleOnLogout = async () => {
        localStorage.clear('users');
        logEvent(analytics, 'logout', {
            user_id: user?.id,
        });
        navigate('/');
    };

    const cartItems = useSelector((state) => state.cart);


    const handleClickOutside = (event) => {
        if (accoutnRef.current && !accoutnRef.current.contains(event.target)) {
          setAccountDropdownVisible(false);
        }
       
      };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])
    

    return (
        <>
            <div>
                {<nav className="flex flex-col md:flex-row items-center justify-between py-4 md:px-12 px-3 border-b border-border fixed bg-white w-full z-20">
                    <div className="text-3xl font-bold mb-4 md:mb-0 md:mr-4 md:block hidden">MvBlack</div>
                    <div className='flex gap-12 justify-around ' >
                        <SearchBar />
                        <div className="flex items-center md:hidden">
                            <button id="menu-toggle" className="block text-primary hover:text-primary">
                                {sidebar ?
                                    <div onClick={() => setSidebar(false)}>
                                        <IoClose className='text-2xl' />
                                    </div>
                                    :
                                    <div onClick={()=>setSidebar(true)} >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    </div>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center font-semibold space-x-12">
                            <Link to="/" className="hover:text-primary hover:bg-gray-100  rounded-md py-2 px-4">Home</Link>



                            <Link className='hover:bg-gray-100  rounded-md py-2 px-4' to={'/cart'} >Cart ({cartItems.length})</Link>
                            {user && <div ref={accoutnRef} className="relative hover:bg-gray-100  rounded-md  px-4">
                                <button
                                    id="dropdownDelayButton"
                                    onClick={toggleAccountDropdown}
                                    className="font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                                    type="button"
                                >
                                    My Account
                                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {isAccountDropdownVisible && (
                                    <div id="dropdownDelay" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                            <li>
                                                <Link to={`${user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                            </li>
                                            {user && <li>
                                                <Link onClick={handleOnLogout} to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
                                            </li>}
                                        </ul>
                                    </div>
                                )}
                            </div>}
                            {!user && <div>
                                <button className='bg-blue-500 py-1  px-3 text-white rounded-lg'>Login</button>
                            </div>}
                        </div>
                    </div>
                </nav>}

                {sidebar && <ResponsiveNavbar setSidebar={setSidebar} sidebar={sidebar} />}
            </div>
        </>
    )
}

export default Navbar
