import { useEffect, useState, useContext } from "react";
import TokenContext from "../../Context/TokenContext";

const ContactList = () => {
  const { access_token } = useContext(TokenContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const base_url = process.env.REACT_APP_BASE_URL;
  const getContacts = async () => {
    try {
      fetch(`${base_url}notes/getContacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            setContacts(data.data);
            setLoading(false);
          } else {
            setError(data.message);
            setLoading(false);
          }
        });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      fetch(`${base_url}notes/deleteContact/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            getContacts();
          } else {
            setError(data.message);
          }
        });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <div className="container my-5">
      <h1 className="text-center">Contact List</h1>
      <div className="row my-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Meassage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              return (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="btn btn-danger"
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
    </div>
  );
};

export default ContactList;
