import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccountNav from './AccountNav';



function AccountPage() {
    const { ready, user, setReady, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    if (!ready) {
        return <>Loading.....</>
    }
    if (ready && !user) {
        return <Navigate to='/login' />
    }

    async function handleLogOut() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />

            <div className="mx-auto text-center max-w-lg">
                <h2>Logged in as {user.name} and {user.email}</h2>
                <button className='primary rounded-full max-w-sm mt-2' onClick={handleLogOut}>Log Out</button>
            </div>

        </div>
    )
}

export default AccountPage
