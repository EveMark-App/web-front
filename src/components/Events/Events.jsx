import React from "react";
import "./events.css";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch("https://evemark.fun/api/user/get-created-events", {
        method: "GET",
        credentials: "include",
      });
      if (response.status == 200) {
        const data = await response.json();
        setEvents(data);
      }
      if (response.status === 500) {
        return <div>Server Error</div>;
      }
    };
    getEvents();
  }, []);

  if (events === null) return <div>Loading...</div>;
  return (
    <section className="events">
      <h2>Created Events</h2>

      <div className="events__container">
        {events.map((event) => (
          <div key={event._id} className="event__card">
            <div className="event__banner" style={{ backgroundImage: `url(${event.bannerURL})` }}></div>
            <div className="event__details">
              <h1 className="event__title">{event.title}</h1>
              <div className="event__description">{event.short_description}</div>
              <div className="two__columns">
                <div className="event__date">{event.date}</div>
                <Link key={event._id} to={`/event/${event._id}`}>
                  <div className="btn goto">Go To</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="event__card">
          <div className="event__banner empty__banner"></div>
          <Link to="/create">
            <div className="plus">
              <BsPlusLg></BsPlusLg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Events;
