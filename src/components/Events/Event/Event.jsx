import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./event.css";
import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import SendMail from "./SendMail/SendMail";
import { Link } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const Event = () => {
  const { id } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API,
  });

  const navigate = useNavigate();

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/event/get-one/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setEventData(data);
    };
    fetchEvent();
  }, []);

  const deleteEvent = async () => {
    const response = await fetch(`/api/event/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.status === 200) {
      navigate("/events");
    }
  };
  if (!isLoaded) return "Loading...";
  if (!eventData) return <div>Loading...</div>;
  return (
    <section className="event__display">
      <div className="event__container__display">
        <div className="event__banner__display">
          <img src={eventData.bannerURL} alt="banner" />
          <br />
        </div>
        <div className="event__details__display">
          <div className="event__title__category">
            <h1 className="event__title__display">{eventData.name}</h1>
            <div className="category">{eventData.category}</div>
          </div>

          <h4>
            {eventData.start_date.substring(0, 10)} → {eventData.end_date.substring(0, 10)} @ {eventData.location}
          </h4>
          <h4 className="price">{eventData.price.$numberDecimal} TND</h4>
          <br />
          <div className="event__short__description__display">{eventData.short_description}</div>
          <br />
          <p className="event__description__display">{eventData.description}</p>
          <br />
          <GoogleMap zoom={20} center={center} mapContainerClassName="map">
            <Marker position={center} />
          </GoogleMap>
          <br />
          <h2>Send An Email to All Participants</h2>
          <SendMail id={id} />
          <br />
          <div className="return__delete">
            <Link to="/events">
              <BsArrowReturnLeft></BsArrowReturnLeft>
            </Link>
            <MdDeleteForever onClick={deleteEvent}></MdDeleteForever>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event;
