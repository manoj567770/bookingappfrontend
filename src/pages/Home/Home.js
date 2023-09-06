import { Fragment, useEffect, useState } from "react";
import { Navbar, HotelCard } from "../../components";
import "./Home.css";
import axios from "axios";

export const Home = () => {
  const { hotels, setHotels } = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          "https://sore-lime-jellyfish-belt.cyclic.app/api/hotels"
        );
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <main className="main d-flex align-center wrap gap-larger">
        {hotels &&
          hotels.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)}
        <HotelCard />
      </main>
    </Fragment>
  );
};
