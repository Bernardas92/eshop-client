import { NavLink } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import "../../index.css";

export default function CategoriesCard() {
  // hooks
  const categories = useCategory();
  return (
    <>
      <div className="collapse" id="profileMenu">
        <div className="card card-body light">
          {auth?.user?.name?.toUpperCase()}
        </div>
      </div>
    </>
  );
}
