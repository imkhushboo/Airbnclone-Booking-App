import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom'
import AccountNav from './AccountNav';
import axios from "axios";


function PlacesPage() {
    const { action } = useParams();
    const [places, setPlaces] = useState([]);
    console.log(action);


    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
            console.log(data);
        })
    }, []);



    return (
        <div>
            <AccountNav />
            {
                (action !== "new") &&

                <div>
                    <div className="text-center">
                        <Link to='/account/places/new' className="bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add new place</Link>
                    </div>
                    {places.length > 0 && places.map((place) => (
                        <Link to={'/account/places/' + place._id} className=' flex cursor-pointer mt-2 rounded-2xl p-4 gap-4  bg-gray-100'>
                            <div className='bg-gray-300 h-32 w-32 '>
                                {place.photos.length > 0 &&
                                    <img className="object-cover h-full w-full" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="image" />
                                }
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl font-bold'>{place.title}</h2>
                                <p>{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            }
        </div>

    )

}

export default PlacesPage
