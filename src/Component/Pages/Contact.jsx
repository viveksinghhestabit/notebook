import React, { useContext, useState } from "react";
import TokenContext from "../../Context/TokenContext";
import { useDispatch, useSelector } from "react-redux";
import { addContactAsync, setError } from "../../store/slices/contacts";

const Contact = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.contacts.error);
  const [contact, setContact] = useState({});
  const { MySwal } = useContext(TokenContext);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      dispatch(addContactAsync(contact));
      setContact({ name: "", email: "", phone: "", message: "" });
      MySwal.fire({
        title: "Success",
        text: "Your message has been sent successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let messageError = "";

    if (!contact.name) {
      nameError = "Name cannot be blank";
    }

    if (!contact.email) {
      emailError = "Email cannot be blank";
    }

    if (!contact.phone) {
      phoneError = "Phone cannot be blank";
    }

    if (!contact.message) {
      messageError = "Message cannot be blank";
    }

    if (nameError || emailError || phoneError || messageError) {
      setError({ nameError, emailError, phoneError, messageError });
      return false;
    }

    return true;
  };
  

  return (
    <div className="container my-3">
      <h1 className="text-center">Contact Us</h1>
      <p className="text-center">
        This is a simple note taking app. You can add, edit and delete notes.
      </p>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                value={contact.name}
                onChange={handleChange}
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <div className="text-danger">{error?.nameError}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={handleChange}
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <div className="text-danger">{error.emailError}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="number"
                value={contact.phone}
                onChange={handleChange}
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
              />
              <div className="text-danger">{error?.phoneError}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                value={contact.message}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your message"
              ></textarea>
              <div className="text-danger">{error?.messageError}</div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Us</h5>
              <iframe
                title="note"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.011390752554!2d77.3177643144736!3d28.61393798243081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef0f4f4f4f4f%3A0x1b3b4f4f4f4f4f4f!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1625581000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
