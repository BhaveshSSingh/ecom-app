import "./App.css";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import { Routes, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import { ACTION, useDispatch } from "./store";
import "@reach/combobox/styles.css";
import Checkout from "./pages/Checkout";
import { useAuth } from "./firebase/auth";
import SignUp from "./pages/SignUp";
import { Header } from "./components/Header";

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
