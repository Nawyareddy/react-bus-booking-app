import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/data";
import { BookingContext } from "./contexts/BookingContext";
import swal from "sweetalert";

const ServiceProvider = () => {
  const bookingDetails = useContext(BookingContext);
  console.log(bookingDetails);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [currentTab, setCurrentTab] = useState(
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
  );
  const [bookTickets, setBookTickets] = useState({});

  const { service } = useParams();
  const name = useRef();
  const tickets = useRef();

  useEffect(() => {
    setServiceDetails(data.serviceType);
    // console.log(data.apsrtc);
  }, []);

  const handleTabClick = (event) => {
    setCurrentTab(event.target.id);
  };

  const handleSubmit = (event, tabContent) => {
    event.preventDefault();
    // console.log(tabContent);

    const ticketDetails = {
      name: name.current.value,
      tickets: tickets.current.value,
      totalPrice: tickets.current.value * tabContent.fare
    };
    if (tickets.current.value === "" || name.current.value === "") {
      swal("Please fill all the details", " ", "warning");
    } else if (tickets.current.value > tabContent.seatsAvailable) {
      swal(tabContent.seatsAvailable + " seats only available", " ", "warning");
    } else {
      setBookTickets(ticketDetails);
    }
  };
  const handleBookTickets = (tickets, tabContent) => {
    console.log(tickets.name);

    if (tickets.name === undefined || tickets.tickets === undefined) {
      swal("Please fill all the details", " ", "warning");
    } else {
      swal("Your tickets booked successfully", " ", "success");
      // console.log(tabContent);
      // console.log(tickets);
      bookingDetails.ticketsDispatch({
        type: "BOOK_TICKETS",
        payload: { ...tabContent, ...tickets }
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        {serviceDetails
          .filter((servicesType) => servicesType.service === service)
          .map((service) => {
            return (
              <div className="card" style={{ width: "18rem" }} key={service.id}>
                <img
                  src={service.imageUrl}
                  className="card-img-top"
                  alt="apsrtc"
                />
                <div className="card-body">
                  <h4 className="card-title">
                    {service.startPoint} - {service.destination}
                  </h4>
                  <p className="card-text">Type : {service.type}</p>
                  <p className="card-text">Fare : {service.fare}</p>
                  <p className="card-text">
                    Seats Available : {service.seatsAvailable}
                  </p>
                  <button
                    className="booking-btn"
                    id={service.id}
                    onClick={handleTabClick}
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="col-md-4">
        <img src={currentTab} alt="bus" />
        {serviceDetails.map((tabContent) => (
          <div key={tabContent.id}>
            {currentTab === `${tabContent.id}` && (
              <div className="card">
                <h2 className="card-header">Booking</h2>
                <div className="card-body">
                  <h3 className="card-title">
                    {tabContent.startPoint} - {tabContent.destination}
                    <span className="seats">({tabContent.seatsAvailable})</span>
                  </h3>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e, tabContent);
                    }}
                  >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        ref={name}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tickets" className="form-label">
                        Tickets
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="tickets"
                        // max={tabContent.seatsAvailable}
                        placeholder="Tickets"
                        ref={tickets}
                      />
                    </div>
                    <p className="card-text">Basic fare : {tabContent.fare}</p>
                    <button type="submit">Calculate Total Fare</button>
                  </form>
                  <p>Name : {bookTickets.name}</p>
                  <p>No of tickets : {bookTickets.tickets}</p>
                  <p>Total Price :{bookTickets.totalPrice} </p>
                  <button
                    className="booking-btn"
                    onClick={handleBookTickets.bind(
                      this,
                      bookTickets,
                      tabContent
                    )}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceProvider;
