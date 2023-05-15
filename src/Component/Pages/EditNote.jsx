import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import TokenContext from "../../Context/TokenContext";
import * as api from "../../Api/index";

const EditNote = () => {
  const [note, setNote] = useState({});
  const [errors, setErrors] = useState([]);
  const { access_token, user, MySwal } = useContext(TokenContext);
  const Navigator = useNavigate();
  const { id } = useParams();
  if (!access_token) {
    Navigator("/login");
  }
  const getNote = async () => {
    const response = await api.getNote(id);
    const data = await response.data;
    if (data.status !== 200) {
      setErrors(data.message);
      return;
    }
    setNote(data.data);
  };
  useEffect(() => {
    getNote();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.updateNote(id, note);
    const data = await response.data;
    if (data.status == "200") {
      setNote({
        title: "",
        description: "",
      });
      MySwal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your note has been updated.",
        timer: 2000,
      }).then(() => {
        user.isAdmin ? Navigator("/admin/notes") : Navigator("/notes");
      });
    } else {
      setErrors(data.errors);
    }
  };
  return (
    <div className="container my-3">
      <h1 className="text-center mx-3">Edit Note</h1>
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={note.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={note.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            {errors.length > 0 && (
              <div className="alert alert-danger" role="alert">
                {errors.map((error) => {
                  return <p> {error.msg} </p>;
                })}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
