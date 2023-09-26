import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory } from "../../context";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberToShowCategories, setNumberToShowCategories] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();

  const handleShowMoreRightClick = () => {
    setNumberToShowCategories((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setNumberToShowCategories((prev) => prev - 10);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://sore-lime-jellyfish-belt.cyclic.app/api/hotelcategory"
        );
        const categoriesToShow = data.slice(
          numberToShowCategories + 10 > data.length
            ? data.length - 10
            : numberToShowCategories,
          numberToShowCategories > data.length
            ? data.length
            : numberToShowCategories + 10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberToShowCategories]);
  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex align-center gap-large">
      {numberToShowCategories >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span class="material-icons-outlined">chevron_left</span>
        </button>
      )}

      {categories &&
        categories.map(({ _id, category }) => (
          <span
            className={`${
              category === hotelCategory ? "context" : "category-context"
            }`}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
      {numberToShowCategories - 10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span class="material-icons-outlined">chevron_right</span>
        </button>
      )}
    </section>
  );
};
