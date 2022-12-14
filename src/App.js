import "./App.css";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/Login";
import SignUp from "./pages/SignUp";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "@reach/combobox/styles.css";
import { useAuth } from "./firebase/auth";

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
      <main className="p-4 min-h-full overflow-hidden block relative pb-24">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;
