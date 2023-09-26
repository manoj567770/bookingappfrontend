import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

const initialValue = "National Parks";

const CategoryProvider = ({ children }) => {
  const [hotelCategory, setHotelCategory] = useState(initialValue);

  return (
    <CategoryContext.Provider value={{ hotelCategory, setHotelCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => useContext(CategoryContext);

export { useCategory, CategoryProvider };
