import React, { useEffect, useState } from 'react';

function PhotoGallery({ place }) {
    const [showallphotos, setShowallphotos] = useState(false);
    if (showallphotos) {
        return (
            <div className='bg-white relative '>
                <h1>Photos of {place.title}</h1>
                <button onClick={() => { setShowallphotos(false) }} className='bg-opacity-50 text-white p-3 fixed right-1 bg-black rounded-md'>
                    close photos
                </button>

                <div className=' grid gap-2 m-auto'>
                    {place.photos.map(photo => (
                        <div className='h-[500px]'>
                            <img className="h-full w-full object-cover aspect-square" src={'http://localhost:4000/uploads/' + photo} alt="photo" />
                        </div>
                    )
                    )}

                </div>
            </div>
        )
    }

    return (
        <div className='gap-4 grid md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr]'>
            <div>
                <img onClick={() => { setShowallphotos(true) }} className="cursor-pointer h-full w-full aspect-square object-cover rounded-tl-lg rounded-bl-lg" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
            </div>
            <div className='grid relative'>
                <div>
                    <img onClick={() => { setShowallphotos(true) }} className=" cursor-pointer aspect-square object-cover rounded-tr-lg rounded-br-lg" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
                </div>
                <div className='overflow-hidden'>
                    <img onClick={() => { setShowallphotos(true) }} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="image" />
                </div>

                <button onClick={() => { setShowallphotos(true) }} className='flex gap-1 px-2 absolute bottom-2 right-2 bg-white  shadow-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                    show all photos</button>

            </div>


        </div>
    )
}

export default PhotoGallery
