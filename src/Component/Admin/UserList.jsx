import { useContext, useEffect, useState } from "react";
import TokenContext from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { access_token } = useContext(TokenContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const getchAllUser = async () => {
    try {
      setLoading(true);
      fetch(`${baseUrl}users/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUsers(data.data);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getchAllUser();
  }, []);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      fetch(`${baseUrl}users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          getchAllUser();
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">User List</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <div className="row">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <button
            onClick={() => navigate("/user-add")}
            className="btn btn-primary"
          >
            Add User
          </button>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-md-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => navigate("/user-edit/" + user._id)}
                      className="btn btn-primary mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
