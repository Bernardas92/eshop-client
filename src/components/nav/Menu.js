import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBell,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Logo from "../../images/Grey.png";
import useCategory from "../../hooks/useCategory";
import CategoriesCard from "../cards/CategoriesCard";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Container wrapper */}
      <div className="container-fluid">
        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar brand */}
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <NavLink className="nav-link" aria-current="page" to="/">
              <img src={Logo} height={35} alt="Logo" loading="lazy" />
            </NavLink>
          </a>
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="navbarSupportedContent">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/shop">
                SHOP
              </NavLink>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Categories
              </a>
            </li>
            <Search />
          </ul>

          {/* Left links */}
        </div>
        {/* Collapsible wrapper */}
        {/* Right elements */}
        <div className="d-flex align-items-center">
          {/* Icon */}
          <a className="text-reset me-3">
            <FontAwesomeIcon icon={faCartShopping} />
            <Badge
              count={cart?.length >= 1 ? cart.length : 0}
              offset={[-5, 11]}
              showZero={true}
            >
              <NavLink className="nav-link p-3" aria-current="page" to="/cart">
                CART
              </NavLink>
            </Badge>
          </a>
          {/* Notifications */}

          {/* Avatar */}
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height={25}
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item">
                  {auth?.user?.name?.toUpperCase()}
                </a>
              </li>
              <li>
                <NavLink
                  className="nav-link"
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Right elements */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
}
