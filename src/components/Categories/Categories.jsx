import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://sore-lime-jellyfish-belt.cyclic.app/api/hotelcategory"
        );
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <section className="d-flex align-center gap-large categories cursor pointer">
      {categories && categories.map(({ category }) => <span>{category}</span>)}
    </section>
  );
};
