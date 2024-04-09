import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { UserContext } from '../UserContext';
import AddressLink from '../AddressLink';
import PhotoGallery from '../PhotoGallery';


function PlacePage() {
    const { user } = useContext(UserContext);
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxguest, setMaxguest] = useState(1);
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [prices, setPrices] = useState(0);
    const [redirect, setRedirect] = useState(null);
    let totalNights = 0;

    if (checkin && checkout) {
        totalNights = differenceInCalendarDays(new Date(checkout), new Date(checkin));
    }

    useEffect(() => {
        if (!id) {
            return;
        }
        else {
            if (user) {
                setName(user.name);
            }
            axios.get(`/places/${id}`).then(({ data }) => {
                console.log(data);
                setPlace(data);
            })
        }
    }, [id]);





    async function handleBooking(e) {
        e.preventDefault();
        setPrices(totalNights * 120);
        const { data } = await axios.post('/booking', {
            place: place._id,
            name,
            totalNights,
            mobile,
            checkin,
            checkout,
            prices,
            maxguest
        });


        setRedirect(`/account/bookings/${data._id}`);
        console.log(data);


    }


    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (!place) return null;

    return (
        <div className='mt-2 p-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <AddressLink place={place} />
            <PhotoGallery place={place} />


            <div className='flex justify-between mt-4'>
                <div>
                    <h1 className='text-2xl font-bold '>Description:</h1>
                    <p>{place.description}</p>

                </div>

                <div className='bg-white shadow-md rounded-2xl p-3'>
                    <h1 className='text-center text-2xl font-bold'>Prices : $150 /- night</h1>
                    <div className='border-2 border-gray-200 rounded-xl mt-2 p-4'>

                        <div className='flex border-b'>
                            <div className='p-2'>
                                <h1>
                                    Checkin :
                                </h1>
                                <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />

                            </div>
                            <div className='border-l p-2'>
                                <h1>Checkout : </h1>
                                <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />

                            </div>
                        </div>
                        <div className='p-2'>
                            <h1>Number of guest</h1>
                            <input type="number" value={maxguest} onChange={(e) => setMaxguest(e.target.value)} />
                        </div>

                        {
                            totalNights > 0 &&
                            <div>
                                <h1>total No. Of Nights: </h1>
                                <h1 className='w-full border my-1 py-2 px-3 rounded-2xl'>{totalNights}</h1>
                                <h1>total Price</h1>
                                <h1 className='w-full border my-1 py-2 px-3 rounded-2xl'>${totalNights * 120}</h1>
                                <h1>Your Full name : </h1>
                                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />

                                <h1>Contact:</h1>
                                <input type="tel" placeholder="+91_" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            </div>
                        }
                    </div>

                    <button onClick={handleBooking} className='primary mt-4 p-2'>Book</button>
                </div>
            </div>
            <div className='mt-4'>
                <h1 className='text-2xl font-bold'>Extra Information</h1>
                <p>{place.extrainfo}</p>
            </div>

        </div >
    )
}

export default PlacePage
