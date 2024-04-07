import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from './AccountNav';




function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [extrainfo, setExtrainfo] = useState("");
    const [maxguest, setMaxguest] = useState("");
    const [redirect, setRedirect] = useState(null);



    useEffect(() => {
        axios.get('/places/' + id).then(({ data }) => {
            console.log(data);
            setTitle(data.title);
            setDescription(data.description);
            setPerks(data.perks);
            setCheckin(data.checkin);
            setAddress(data.address);
            setCheckout(data.checkout);
            setMaxguest(data.maxguest);
            setExtrainfo(data.extrainfo);
            setPhotos(data.photos);

        })
    }, [id])

    function inputheader(text) {

        return <h2 className='text-2xl mt-4'>{text}</h2>


    }


    function inputdescription(text) {
        return <p className='text-gray-500 text-sm'>{text}</p>

    }


    function setTags(header, text) {
        return (
            <>
                {inputheader(header)}
                {inputdescription(text)}
            </>
        )
    }


    async function savePlace(e) {
        e.preventDefault();
        const placeData = {
            title, description, perks,
            address, photos, checkin,
            checkout, maxguest, extrainfo
        };

        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData
            });

        }
        else {
            await axios.post('/places', placeData);

        }
        setRedirect(true);

    }


    if (redirect) {
        return <Navigate to='/account/places' />
    }



    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {setTags("Title", "Title for youe place should be short and precise.")}
                <input className="rounded-full" type="text" placeholder='Title for eg. Antialia ' value={title} onChange={(e) => setTitle(e.target.value)} />
                {setTags("Address", "place you visited.")}

                <input className="rounded-full" type="text" placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                {setTags("Photos", "more = better")}
                <PhotosUploader photos={photos} onChange={setPhotos} />

                {setTags("Description", "description of your visited place")}
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                {setTags("Perks", "Perks for you ! selectd any")}
                <Perks selected={perks} onChange={setPerks} />
                {setTags("Extra Info", "house,rules etc")}
                <textarea value={extrainfo} onChange={(e) => setExtrainfo(e.target.value)} />
                {setTags("Check In & Out time", "enter your in and out time")}
                <div className='grid sm:grid-cols-2 md-grid-cols-3  lg:grid-cols-3 gap-2'>
                    <div>
                        <label>Check In </label>
                        <input type="time" placeholder='14.00' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                    </div>
                    <div>
                        <label>Check Out </label>

                        <input type="time" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                    </div>
                    <div>
                        <label>Max Guest</label>
                        <input type="number" value={maxguest} onChange={(e) => setMaxguest(e.target.value)} />
                    </div>
                </div>

                <button className='mt-2 w-full text-white rounded-full'>Save</button>
            </form>

        </div>
    )
}

export default PlacesFormPage
