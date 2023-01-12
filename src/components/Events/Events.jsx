import React from "react";
import "./events.css";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Event 1",
      short_description:
        "Summer concert series featuring local talent and delicious food. Bring blankets or chairs and enjoy the music under the stars. Family-friendly and fun for all ages.",
      date: "2021-09-01",
      banner: "https://picsum.photos/2000/300",
    },
    {
      id: 2,
      title: "Event 2",
      short_description:
        "Summer concert series featuring local talent and delicious food. Bring blankets or chairs and enjoy the music under the stars. Family-friendly and fun for all ages. ",
      date: "2021-09-02",
      banner: "https://picsum.photos/2000/300",
    },
    {
      id: 3,
      title: "Event 2",
      short_description:
        "Summer concert series featuring local talent and delicious food. Bring blankets or chairs and enjoy the music under the stars. Family-friendly and fun for all ages. ",
      date: "2021-09-02",
      banner: "https://picsum.photos/2000/300",
    },
    {
      id: 4,
      title: "Event 2",
      short_description:
        "Summer concert series featuring local talent and delicious food. Bring blankets or chairs and enjoy the music under the stars. Family-friendly and fun for all ages. ",
      date: "2021-09-02",
      banner: "https://picsum.photos/2000/300",
    },
    {
      id: 5,
      title: "Event 2",
      short_description:
        "Summer concert series featuring local talent and delicious food. Bring blankets or chairs and enjoy the music under the stars. Family-friendly and fun for all ages. ",
      date: "2021-09-02",
      banner: "https://picsum.photos/2000/300",
    },
  ];
  return (
    <section className="events">
      <h2>Created Events</h2>

      <div className="events__container">
        {events.map((event) => (
          <div key={event.id} className="event__card">
            <div className="event__banner" style={{ backgroundImage: `url(${event.banner})` }}></div>
            <div className="event__details">
              <h1 className="event__title">{event.title}</h1>
              <div className="event__description">{event.short_description}</div>
              <div className="two__columns">
                <div className="event__date">{event.date}</div>
                <div className="btn goto">Go To</div>
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
