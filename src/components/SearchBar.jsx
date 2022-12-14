import { ComboBox } from "./ComboBox";

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ACTION, useDispatch, useSelector } from "../store";

function SearchBar() {
  // changing category
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchterm");

  // Getting products for combobox
  const products = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") ?? "all"
  );
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchAllCategories() {
    const result = await fetch("https://fakestoreapi.com/products/categories");
    dispatch({ type: ACTION.ADD_CATEGORIES, payload: await result.json() });
  }

  if (!categories?.length) {
    fetchAllCategories();
  }

  const handleCategoryChange = (e) => {
    const { value: category } = e.target;
    setSelectedCategory(category);
    navigate(
      category === "all"
        ? "/"
        : `/?category=${category}${
            searchTerm ? "&searchterm=" + searchTerm : ""
          }`
    );
  };

  const handleSearchChange = (searchTerm) => {
    if (searchTerm) {
      navigate(
        selectedCategory === "all"
          ? `/?searchterm=${searchTerm}`
          : `/?category=${selectedCategory}&searchterm=${searchTerm}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? "/" : `/?category=${selectedCategory}`
      );
    }
  };

  return (
    <div className="filter rounded-lg">
      <section className="filter__category rounded-lg">
        <select
          name="category-filter"
          id="category-filter"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="all">all</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>
      <section className="filter__text">
        <ComboBox
          items={
            selectedCategory === "all"
              ? products
              : products?.filter((prod) => prod.category === selectedCategory)
          }
          onSelectionChange={handleSearchChange}
          onSearch={handleSearchChange}
        />
      </section>
    </div>
  );
}

export default SearchBar;
