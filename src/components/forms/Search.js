import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import {FcSearch} from "react-icons/fc"

export default function Search() {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex mt-2"  style={{height: "35px"}} onSubmit={handleSubmit}>
      <input
        type="search"
        style={{ borderRadius: "7px"}}
        className="form-control"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <button
        className="btn btn-outline"
        type="submit"
        style={{ borderRadius: "7px", width: "60px", paddingTop: "2px"}}
      >
        <FcSearch style={{fontSize: "25px"}} />
      </button>
    </form>
  );
}
