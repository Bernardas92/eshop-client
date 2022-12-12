import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import "../../index.css";

export default function CategoriesCard() {
  // hooks
  const categories = useCategory();
  return (
    <>
      <div className="collapse" id="collapseExample">
        <div className="card card-body light">
          <NavLink className="item" to="/categories">
            All Categories
          </NavLink>

          {categories?.map((c) => (
            <NavLink className="item" to={`/category/${c.slug}`}>
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
