import React from "react";
import { useParams } from "react-router-dom";
import "./event.css";
import { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Event = () => {
  const { id } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API,
  });

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  // const [eventData, setEventData] = useState(null);

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const response = await fetch(`https://evemark.samikammoun.me/event/get-one/${id}`);
  //     const data = await response.json();
  //     setEventData(data);
  //   };
  //   fetchEvent();
  // }, [id]);
  const eventData = {
    name: "Metaverse Tunisian Summit",
    short_description:
      "The Metaverse Tunisian Summit is an event focused on discussing and exploring the development and possibilities of the metaverse in the Tunisian context, featuring keynote speeches and panel discussions from industry experts and thought leaders.",
    bannerURL: "https://picsum.photos/2000/300",
    location: "Hammamet - Diar Medina",
    start_date: "2021-09-01",
    end_date: "2021-09-02",
    price: "20",
    description: `The Metaverse Tunisian Summit is a premier event that brings together leading experts and innovators from a wide range of industries to discuss and explore the development and possibilities of the metaverse in the Tunisian context. The event features a diverse range of keynote speeches, panel discussions, and interactive sessions that provide valuable insights and perspectives on the current state and future of the metaverse.

      The summit will provide attendees with an in-depth understanding of the latest trends and developments in the field of metaverse, and will cover a wide range of topics, including virtual reality, augmented reality, mixed reality, blockchain and cryptocurrency, artificial intelligence, and more. Attendees will have the opportunity to engage with industry leaders and experts, as well as to network with other attendees, making valuable connections and gaining new insights into the potential of the metaverse.
      
      Participants will also be exposed to the latest innovations and use cases in metaverse across different fields and industries, such as education, healthcare, tourism, entertainment, finance and many more. It is a perfect opportunity to be educated and updated on the current and future potential of metaverse in Tunisia and globally.
      
      The Metaverse Tunisian Summit also aims to foster collaboration and partnership opportunities between Tunisian and international stakeholders, and to promote the growth of the metaverse ecosystem in the country. Through the summit, attendees will gain a greater understanding of the potential of the metaverse to drive innovation and transformation in the Tunisian economy and society.
      
      Overall, the Metaverse Tunisian Summit is an event not to be missed for anyone interested in understanding and harnessing the power of the metaverse to drive innovation and growth in the Tunisian context.`,
    category: "Technology",
  };
  console.log(id);
  if (!isLoaded) return "Loading...";
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
            {eventData.start_date} → {eventData.end_date}
          </h4>
          <h4 className="price">{eventData.price} TND</h4>
          <br />
          <div className="event__short__description__display">{eventData.short_description}</div>
          <br />
          <p className="event__description__display">{eventData.description}</p>
          <br />
          <GoogleMap zoom={20} center={center} mapContainerClassName="map">
            <Marker position={center} />
          </GoogleMap>
          <br />
        </div>
      </div>
    </section>
  );
};

export default Event;
