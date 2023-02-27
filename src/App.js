import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booking from "./components/Bookings";
import { BookingContext } from "./components/contexts/BookingContext";
import Header from "./components/Header";
import Home from "./components/Home";
import bookingReducer from "./components/reducers/bookingReducer";
import ServiceProvider from "./components/ServiceProvider";
import "./styles.css";

export default function App() {
  const [ticketsState, ticketsDispatch] = useReducer(bookingReducer);
  console.log(ticketsState);

  const bookingData = {
    ticketsState,
    ticketsDispatch
  };
  return (
    <BookingContext.Provider value={bookingData}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="service-provider/:service"
              element={<ServiceProvider />}
            ></Route>
            <Route path="/bookings" element={<Booking />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </BookingContext.Provider>
  );
}
