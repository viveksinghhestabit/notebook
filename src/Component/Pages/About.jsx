import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const About = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    btn: "",
  });
  const handleAddEvent = () => {
    const { id, title, startDate, startTime, endDate, endTime, btn } = formData;
    if (id) {
      const index = events.findIndex((event) => event.id == id);
      const newEvent = {
        id: id,
        title: title,
        start: new Date(startDate + "T" + startTime),
        end: new Date(endDate + "T" + endTime),
        btn: btn,
      };
      const newEvents = [...events];
      newEvents[index] = newEvent;
      setEvents(newEvents);
      handleClose();
    } else {
      const newEvent = {
        id: events.length + 1,
        title: title,
        start: new Date(startDate + "T" + startTime),
        end: new Date(endDate + "T" + endTime),
        btn: btn,
      };
      setEvents([...events, newEvent]);
      handleClose();
    }
    setFormData({
      id: "",
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      btn: "",
    });
  };

  const [events, setEvents] = useState([
    { id: 1, title: "Meeting", start: new Date(), btn: "btn btn-primary" },
    {
      id: 2,
      title: "Meeting",
      start: new Date("2024-01-10T10:30:00"),
      end: new Date("2024-01-11T12:30:00"),
      btn: "btn btn-success",
    },
  ]);

  return (
    <div className="container my-3">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  value={formData.title}
                  placeholder="Enter Title"
                  className="form-control"
                  id="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="start">Start Date</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="date"
                      onChange={(e) => {
                        setFormData({ ...formData, startDate: e.target.value });
                      }}
                      value={formData.startDate}
                      placeholder="Enter Start Date"
                      className="form-control"
                      id="start"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="time"
                      onChange={(e) => {
                        setFormData({ ...formData, startTime: e.target.value });
                      }}
                      value={formData.startTime}
                      placeholder="Enter Start Time"
                      className="form-control"
                      id="start"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="end">End Date</label>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="date"
                      onChange={(e) => {
                        setFormData({ ...formData, endDate: e.target.value });
                      }}
                      value={formData.endDate}
                      placeholder="Enter End Date"
                      className="form-control"
                      id="end"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="time"
                      onChange={(e) => {
                        setFormData({ ...formData, endTime: e.target.value });
                      }}
                      value={formData.endTime}
                      placeholder="Enter End Time"
                      className="form-control"
                      id="end"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <select
                  name="btn"
                  id="btn"
                  className="form-control"
                  onChange={(e) => {
                    setFormData({ ...formData, btn: e.target.value });
                  }}
                >
                  <option
                    value="btn btn-primary"
                    selected={formData.btn == "btn btn-primary" ? true : false}
                  >
                    Blue
                  </option>
                  <option
                    value="btn btn-success"
                    selected={formData.btn == "btn btn-success" ? true : false}
                  >
                    Green
                  </option>
                  <option
                    selected={formData.btn == "btn btn-warning" ? true : false}
                    value="btn btn-warning"
                  >
                    Yellow
                  </option>
                  <option
                    value="btn btn-danger"
                    selected={formData.btn == "btn btn-danger" ? true : false}
                  >
                    Red
                  </option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleAddEvent()}>
              Add Event
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <h1 className="text-center">About Us</h1>
      <p className="text-center">
        This is a simple note taking app. You can add, edit and delete notes.
      </p>
      <div className="row">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialDate={new Date()}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => {
            return (
              <>
                <button
                  className={eventInfo.event.extendedProps.btn + " text-center"}
                  style={{ width: "100%" }}
                >
                  <b style={{ marginRight: "10px" }}>{eventInfo.timeText}</b>
                  <i>{eventInfo.event.title}</i>
                </button>
              </>
            );
          }}
          eventClick={(eventInfo) => {
            setFormData({
              id: eventInfo.event.id,
              title: eventInfo.event.title,
              startDate: eventInfo.event.startStr.split("T")[0],
              startTime: eventInfo.event.startStr.split("T")[1].split("+")[0],
              endDate: eventInfo.event.endStr.split("T")[0],
              endTime: eventInfo.event.endStr.split("T")[1].split("+")[0],
              btn: eventInfo.event.extendedProps.btn,
            });
            handleShow();
          }}
          dateClick={(dateClickInfo) => {
            setFormData({
              id: "",
              title: "",
              startDate: dateClickInfo.dateStr,
              startTime: new Date().toLocaleTimeString(),
              endDate: dateClickInfo.dateStr,
              endTime: new Date().toLocaleTimeString(),
              btn: "btn btn-primary",
            });
            handleShow();
          }}
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-fluid"
                    src="http://localhost:3000/static/media/notes.a2a534d92c3cff97ba49.png"
                    alt=""
                  />
                </div>
                <div className="col-md-8 text-center">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
