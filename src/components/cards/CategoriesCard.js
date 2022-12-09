import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import "../../index.css";

export default function CategoriesCard() {
  // hooks
  const categories = useCategory();
  return (
    <>
      <div className="collapse mt-1" id="collapseExample">
        <div className="card card-body bg-dark">
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
