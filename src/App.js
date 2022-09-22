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
  Navigate,
} from "react-router-dom";
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
import { getItemCount } from "./utils";
import Checkout from "./pages/Checkout";
import { useAuth } from "./firebase/auth";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route
            path="/Checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

// For the drop down on Search
function ComboBox({ items, onSelectionChange, onSearch }) {
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("searchterm") ?? ""
  );

  const handleChange = (e) => {
    const { value } = e.target;
    if (!value && searchTerm !== value) {
      // empyt value or the combobox is cleared
      onSelectionChange(value);
    }
    setSearchTerm(value);
  };

  const handleProductSelection = (productTitle) => {
    setSearchTerm(productTitle);
    onSelectionChange(productTitle);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

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

// Creating
function CartInfo() {
  const cartItems = useSelector((state) => state.cart);
  const count = getItemCount(cartItems);
  console.log(cartItems);
  return (
    <div className="cart__info">
      <span className="count">{count}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="container"
        color="white"
      >
        <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const signOutCurrentUser = async () => {
    await signOut();
    navigate("/login");
  };
  return (
    <nav className="header">
      <section className="header__title">
        <Link to="/">
          <svg
            className="icon"
            alt="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      </section>
      <section className="header__searchbar">
        <SearchBar />
      </section>
      <section className="header__navigation">
        <ul className="header__navigation__links">
          <li>
            {user ? `Hello ${user?.displayName ?? user.email}` : "Sign In"}
          </li>
          <li>
            {user ? <button onClick={signOutCurrentUser}>Logout</button> : null}
          </li>
          <li>
            <Link to="/cart">
              <CartInfo />
            </Link>
          </li>
        </ul>
      </section>
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
