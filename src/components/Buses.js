import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import data from "../data/data";
const Buses = () => {
  const [busData, setBusData] = useState([]);
  useEffect(() => {
    setBusData(data.buses);
  }, []);
  return (
    <div>
      {/* <Link to="service-provider" className="nav-link"> */}
      <div className="row">
        {busData.map((bus) => {
          return (
            <div className="col-md-4 mb-2" key={bus.id}>
              <div className="card" style={{ width: "18rem" }}>
                <Link to={`service-provider/${bus.service}`}>
                  <img src={bus.imageUrl} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <h3 className="card-title">{bus.service}</h3>
                  <p className="card-text bus-ratings">Rating :{bus.rating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* </Link> */}
      <Outlet />
    </div>
  );
};

export default Buses;
