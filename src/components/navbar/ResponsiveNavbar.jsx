import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../searchbar/SearchBar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../firebase/firebaseCongif';



const ResponsiveNavbar = ({ setSidebar, sidebar }) => {

    const [isCategoriesDropdownVisible, setCategoriesDropdownVisible] = useState(false);
    const [isAccountDropdownVisible, setAccountDropdownVisible] = useState(false);



    const user = JSON.parse(localStorage.getItem('users'));

    const navigate = useNavigate();
    const navbarRef = useRef(null);



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
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setAccountDropdownVisible(false);
        }
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setSidebar(false);
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
            <nav ref={navbarRef} className={`right-0 fixed bg-white w-[60%] min-h-screen z-10 shadow-lg transition ease-linear duration-3000`}>
                
                <div className="flex flex-col items-center justify-center gap-6 font-semibold  pt-28">
                    <Link to="/" className="hover:text-primary hover:bg-gray-100  rounded-md py-2 px-4">Home</Link>
                    <Link to={'/cart'} className='hover:bg-gray-100  rounded-md py-2 px-4' >Cart ({cartItems.length})</Link>
                  
                 { user &&   <div className="relative hover:bg-gray-100  rounded-md py-2 px-4">
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
                                        <Link to={`${user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}`} className="block  dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100  rounded-md py-2 px-4">Dashboard</Link>
                                    </li>
                                    {user && <li>
                                        <Link onClick={handleOnLogout} to="/login" className="block  dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-100  rounded-md py-2 px-4">Logout</Link>
                                    </li>}
                                </ul>
                            </div>
                        )}
                    </div>}
                    {!user && <div>
                        <button className='bg-blue-500 py-1  px-3 text-white rounded-lg'>Login</button>
                    </div>}
                </div>
            </nav>
        </>
    )
}

export default ResponsiveNavbar
