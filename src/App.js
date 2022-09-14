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
import { useEffect } from "react";
import { useState } from "react";
import { ACTION, useDispatch, useSelector } from "./store";
import { type } from "@testing-library/user-event/dist/type";

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

function SearchBar() {
  // changing category
  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? "all"
  );
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllCategories();
  }, []);

  async function fetchAllCategories() {
    const result = await fetch("https://fakestoreapi.com/products/categories");
    dispatch({ type: ACTION.ADD_CATEGORIES, payload: await result.json() });
  }

  if (!categories?.length) {
    fetchAllCategories();
  }

  const handleCategoryChange = (e) => {
    const { value: category } = e.target;

    setSelectedCategory(e.target.value);

    navigate(category === "all" ? "/" : `/?category=${e.target.value}`);
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
        <section className="filter__text"></section>
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
