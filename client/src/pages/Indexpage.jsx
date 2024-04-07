import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexPage() {

  const [places, setPlaces] = useState([]);


  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces([...data]);
      console.log(places);
      console.log(places.length);
    })
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl font-bold">All you places!</h2>
      <div className=" mt-4 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {
          (places.length > 0) && places.map((place) => (
            <Link to={"/place/" + place._id}>
              <div className="rounded-2xl">
                {place.photos.length > 0 &&
                  <img className="object-cover aspect-square rounded-xl" src={"http://localhost:4000/uploads/" + place.photos[0]} />
                }
                <h2 >{place.title}</h2>
                <h3 clasname="font-bold text-sm">{place.address}</h3>

              </div>
            </Link>
          )



          )}

      </div>
    </div>
  );
}

export default IndexPage;
