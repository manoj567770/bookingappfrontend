import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment, useEffect, useState } from "react";
import { Navbar, HotelCard } from "../../components";
import "./Home.css";

export const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://sore-lime-jellyfish-belt.cyclic.app/api/hotels"
        );
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(
          hotels.concat(testData.slice(currentIndex, currentIndex + 16))
        );
        setCurrentIndex((prev) => prev + 16);
      } else {
        setHotels([]);
      }
    }, 2000);
  };
  return (
    <Fragment>
      <Navbar />
      {hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hotels.length > 0 && <h3 className="loader">Loading...</h3>}
          endMessage={<p className="loader">You have see at All</p>}
        >
          <main className="main d-flex align-center wrap gap-larger">
            {hotels &&
              hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
    </Fragment>
  );
};
