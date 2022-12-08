import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

export default function CategoriesCard() {
  // hooks
  const categories = useCategory();
  return (
    <>
      <div className="collapse mt-1" id="collapseExample">
        <div className="card card-body">
          <NavLink className="nav-link" to="/categories">
            All Categories
          </NavLink>

          {categories?.map((c) => (
            <NavLink className="nav-link" to={`/category/${c.slug}`}>
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
