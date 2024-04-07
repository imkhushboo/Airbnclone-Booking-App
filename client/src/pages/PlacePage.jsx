import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";



function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            axios.get(`/places/${id}`).then(({ data }) => {
                console.log(data);
                setPlace(data);
            })
        }
    }, []);


    if (!place) return;
    return (
        <div className='bg-gray-500 mt-2 p-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <div className='flex gap-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                </svg>

                <a target="_blank" href={"http://map.google.com/?g=" + place.address} className='my-2 block underline font-semibold'>{place.address}</a>
            </div>
            <div className='gap-4 grid grid-cols-[2fr_1fr] '>
                <div>
                    <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
                </div>
                <div className='grid'>
                    <div>
                        <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
                    </div>
                    <div className='overflow-hidden'>
                        <img className="aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
                    </div>

                </div>


            </div>
            <div className='flex'>

                <p>{place.description}</p>
                <div>
                    <h1>Prices : $12</h1>
                </div>
            </div>

        </div>
    )
}

export default PlacePage
