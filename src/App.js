import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import logo from "../src/assets/logo.png";
import { useState } from "react";
import { ACTION, useDispatch, useSelector } from "./store";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
        </Route>

        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

// For the drop down on Search
function ComboBox({ items, onSelectionChange }) {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() =>
    searchParams.get("searchterm")
  );

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value && searchTerm !== value) {
      // empyt value or the combobox is cleared
      onSelectionChange(value);
    }
    setSearchTerm(e.target.value);
  };

  const handleProductSelection = (productTitle) => {
    setSearchTerm(productTitle);
    onSelectionChange(productTitle);
  };

  const handleSearch = () => {};

  const results = searchTerm
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <>
      <Combobox aria-label="products" onSelect={handleProductSelection}>
        <ComboboxInput
          className="city-search-input"
          onChange={handleChange}
          type="search"
          value={searchTerm}
        />
        <button onClick={handleSearch}>🔎</button>
        {results && (
          <ComboboxPopover className="shadow-popup">
            {results.length > 0 ? (
              <ComboboxList>
                {results.slice(0, 5).map((prod, index) => (
                  <ComboboxOption key={prod.id} value={prod.title} />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                No results found
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </>
  );
}

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

  // const handleSearchTerm = () => {};
  const handleSearchChange = (searchTerm) => {
    if (searchTerm) {
      navigate(`/?category=${selectedCategory}&searchterm=${searchTerm}`);
    } else {
      navigate(
        selectedCategory === "all" ? "/" : `/?category=${selectedCategory}`
      );
    }
  };

  return (
    <>
      <div className="filter">
        <section className="filter__category">
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
            onSelectionChange={handleSearchChange}
            items={
              selectedCategory === "all"
                ? products
                : products?.filter((prod) => prod.category === selectedCategory)
            }
          />
        </section>
      </div>
    </>
  );
}

function Header() {
  return (
    <nav className="header">
      <section className="header__title">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </section>
      <section className="header__searchbar">
        <SearchBar />
      </section>
      <section className="header__navigation">Welcome User</section>
      <Link to="/cart">Cart</Link>
    </nav>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
    </>
  );
}

export default App;
