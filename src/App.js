import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import logo from "../src/assets/logo.png";
import { useEffect } from "react";
import { useState } from "react";

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
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchAllCategories();
  }, []);

  async function fetchAllCategories() {
    const result = await fetch("https://fakestoreapi.com/products/categories");
    setCategories(await result.json());
  }
  return (
    <>
      <div className="filter">
        <section className="filter__category">
          <select name="category-filter" id="category-filter">
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
