import { useContext, useEffect, useState } from "react";
import { BookingContext } from "./contexts/BookingContext";

const Booking = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const bookingDetails = useContext(BookingContext);
  console.log(bookingDetails.ticketsState);

  useEffect(() => {
    setBookingHistory(bookingDetails.ticketsState);
  }, []);

  return (
    <div>
      <h1>Booking</h1>
      {bookingHistory?.map((ticketInfo) => {
        return (
          <div className="card" style={{ width: "18rem" }} key={ticketInfo.id}>
            <div className="card-body">
              <img src={ticketInfo.imageUrl} alt="bus" width="200" />
              <h5 className="card-title seats">
                {ticketInfo.startPoint} - {ticketInfo.destination}
              </h5>
              <h6 className="card-subtitle mb-2">Name : {ticketInfo.name}</h6>
              <p className="card-text">Tickets Booked : {ticketInfo.tickets}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Booking;
