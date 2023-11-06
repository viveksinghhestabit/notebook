import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../../Context/TokenContext";
import * as api from "../../Api/index";
import { useDispatch, useSelector } from "react-redux";
import { getNotes as getn } from "../../store/slices/notes";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const { access_token, user, MySwal } = useContext(TokenContext);
  const Navigator = useNavigate();

  const getNotes = async () => {
    if (!access_token) {
      Navigator("/login");
    } else {
      const response = await api.getNotes();
      const data = await response.data;
      if (data.status !== 200) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        return;
      }
      dispatch(getn(data.data));
    }
  };

  const deleteNote = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await api.deleteNote(id);
        const data = await response.data;
        if (data.status !== 200) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          return;
        }
        MySwal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your note has been deleted.",
          timer: 2000,
        }).then(() => {
          getNotes();
        });
      } else {
        MySwal.fire("Cancelled", "Your note is safe :)", "error");
      }
    });
  };
  useEffect(() => {
    getNotes();
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
      </table>
    </div>
  );
};

export default Notes;
