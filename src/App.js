import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Routes, Route, Outlet, Link } from "react-router-dom";

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

function Layout() {
  return (
    <>
      <nav className="header">
        Logo ------Search bar------cart icon
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
