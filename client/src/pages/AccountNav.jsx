import React, { useContext } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../UserContext';



function AccountNav() {
    const { user } = useContext(UserContext);
    const { pathname } = useLocation();
    let params = pathname.split('/')?.[2];
    console.log(params);
    if (params === undefined) {
        params = "profile";
    }
    function setLink(type = null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full ';
        if (type === params) {

            classes += 'bg-primary text-white';

        }
        else {
            classes += 'bg-gray-200';
        }

        return classes;


    }


    if (!user) {
        return <Navigate to="/login" />
    }
    return (

        <div>
            <nav className='justify-center mt-6'>
                <h1 className='text-center'>
                    Welcome! {user.name}
                </h1>
                <div className="justify-center flex gap-3 mt-4 w-full mb-8">
                    <Link to='/account' className={setLink("profile")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>

                        My Profile</Link>
                    <Link to='/account/bookings' className={setLink("bookings")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                        </svg>

                        My bookings</Link>
                    <Link to='/account/places' className={setLink("places")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        My accomodations</Link>
                </div>

            </nav>

        </div>
    )
}

export default AccountNav
