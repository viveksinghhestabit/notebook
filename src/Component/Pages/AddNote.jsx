import React, { useContext, useState } from "react";
import TokenContext from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import * as api from "../../Api/index";

const AddNote = () => {
  const Navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { access_token, user, MySwal } = useContext(TokenContext);
  if (!access_token) {
    Navigator("/login");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.addNote(note);
    const data = await response.data;
    if (data.status == "200") {
      setNote({
        title: "",
        description: "",
      });
      MySwal.fire({
        icon: "success",
        title: "Created!",
        text: "Note Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        user.role === "admin" ? Navigate("/admin/notes") : Navigate("/notes");
      });
    } else {
      setErrors(data.errors);
    }
  };
  return (
    <div className="container my-3">
      <h1 className="text-center mx-3">Add a Note</h1>
      <div className="row my-5">
        <div className="col-md-6 mx-auto">
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                value={note.description}
                onChange={handleChange}
                id="description"
                rows="3"
              ></textarea>
            </div>
            {errors.length > 0 && (
              <div className="alert alert-danger" role="alert">
                {errors.map((error) => {
                  return <li>{error.msg}</li>;
                })}
              </div>
            )}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
