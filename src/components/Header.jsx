import SearchBar from "./SearchBar";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import { CartInfo } from "./CartInfo";
import { HiShoppingBag } from "react-icons/hi";

export function Header() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const signOutCurrentUser = async () => {
    await signOut();
    navigate("/login");
  };
  return (
    <nav
      className="header rounded-lg 
    rounded-r-none
    flex items-center justify-between"
    >
      <section className="">
        <Link to="/">
          <HiShoppingBag size={50} color={"white"} />
        </Link>
      </section>
      <section className="rounded-lg bg-white">
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
