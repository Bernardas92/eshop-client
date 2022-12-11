import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Logo from "../../images/Grey.png";
import { FaShoppingBag, FaCartArrowDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import "../../index.css";

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks

  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="logo" style={{ marginRight: "20px" }}>
              <NavLink className="nav-link" aria-current="page" to="/">
                <img src={Logo} alt="logo" />
              </NavLink>
            </li>

            <li>
              <button
                className="button-85 mt-2"
                style={{ marginRight: "30px" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Categories
              </button>
            </li>
            <Search />
          </ul>
          <div className="d-flex align-items-center">
            <li className="nav-item" style={{ marginRight: "30px" }}>
              <Badge
                count={cart?.length >= 1 ? cart.length : 0}
                offset={[-5, 11]}
                showZero={true}
              >
                <NavLink className="button-85" aria-current="page" to="/cart">
                  <FaCartArrowDown /> CART
                </NavLink>
              </Badge>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item" style={{ marginRight: "30px" }}>
                  <NavLink className="button-85" to="/login">
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="button-85" to="/register">
                    REGISTER
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="dropdown">
                <li>
                  <button
                    className="pointer button-85"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    Menu
                  </button>

                  <ul className="dropdown-menu p-3">
                    <li className="nav-link mb-3">
                      {auth?.user?.name?.toUpperCase()}
                    </li>

                    <li>
                      <NavLink
                        className="nav-link"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        <FiUser /> Profile
                      </NavLink>
                      <li className="nav-item mt-1">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/shop"
                        >
                          <FaShoppingBag /> Shop
                        </NavLink>
                      </li>
                    </li>

                    <li className="nav-item pointer">
                      <a onClick={logout} className="nav-link mt-1">
                        <TbLogout /> Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
