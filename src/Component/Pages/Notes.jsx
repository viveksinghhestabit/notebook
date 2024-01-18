import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";
import { useDispatch, useSelector } from "react-redux";
import { getNotesAsync, deleteNoteAsync } from "../../store/slices/notes";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const { user, MySwal } = useContext(TokenContext);
  const Navigator = useNavigate();
  const deleteNote = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this note!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it.",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNoteAsync(id));
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(getNotesAsync());
  }, []);
  return (
    <div className="container my-3">
      <h1 className="text-center mx-3">My Notes</h1>
      <div>
        <button
          className="btn btn-primary my-3"
          onClick={() => {
            user.role === "admin"
              ? Navigator("/admin/add-note")
              : Navigator("/add-note");
          }}
          style={{ float: "right" }}
        >
          Add Note
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {loading === true ? (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={note._id}>
                  <th scope="row">{++index}</th>
                  <td>{note.title}</td>
                  <td>{note.description}</td>
                  <td>
                    <button
                      onClick={() => {
                        user.role === "admin"
                          ? Navigator(`/admin/edit-note/${note._id}`)
                          : Navigator(`/edit-note/${note._id}`);
                      }}
                      className="btn btn-sm btn-primary"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Notes;
