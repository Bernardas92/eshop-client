import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import CategoriesCard from "../cards/CategoriesCard";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Logo from "../../images/Grey.png";
import { FaShoppingBag, FaCartArrowDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

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
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={Logo} alt="logo" />
          </NavLink>
        </li>

        {/* <div className="dropdown">
          <li>
            <a
              className="nav-link pointer dropdown-toggle mt-2"
              data-bs-toggle="dropdown"
            >
              CATEGORIES
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink className="nav-link" to="/categories">
                  All Categories
                </NavLink>
              </li>

              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </div> */}

        <p>
          <button 
            className="btn btn-primary mt-2"
            type="button"
            style={{ backgroundColor: "#a1a1a1" }}
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Categories
          </button>
        </p>

        <Search />

        <li className="nav-item mt-2 ">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              <FaCartArrowDown /> CART
            </NavLink>
          </Badge>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer btn btn-secondary dropdown-toggle mt-2"
                style={{ backgroundColor: "#a1a1a1" }}
                data-bs-toggle="dropdown"
              >
                Menu
              </a>

              <ul className="dropdown-menu">
                <li className="nav-link">{auth?.user?.name?.toUpperCase()}</li>

                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    <FiUser /> Profile
                  </NavLink>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/shop"
                    >
                      <FaShoppingBag /> Shop
                    </NavLink>
                    <li className="nav-item ">
                      <Badge
                        count={cart?.length >= 1 ? cart.length : 0}
                        offset={[-5, 11]}
                        showZero={true}
                      >
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/cart"
                        >
                          <FaCartArrowDown /> CART
                        </NavLink>
                      </Badge>
                    </li>
                  </li>
                </li>

                <li className="nav-item pointer">
                  <a onClick={logout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
}
