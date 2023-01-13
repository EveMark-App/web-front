import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../../Upload/Upload";
import "./create.css";

const Create = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    bannerURL: "",
    location: "",
    date: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await fetch("https://evemark.fun/api/event/create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/event/${data._id}`);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const setUrl = (url) => {
    setFormData({
      ...formData,
      bannerURL: url,
    });
  };

  return (
    <section className="create">
      <h2>Create Your Event</h2>
      <div className="create__container">
        <div className="create__guide">
          <h3>Your journey to event management starts here!</h3>
        </div>
        <form className="create__form" onSubmit={handleSubmit}>
          <div className="step first__step" style={{ display: step === 1 ? "grid" : "none" }}>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Your Event Name"
              value={formData.name}
            />
            <textarea
              onChange={handleChange}
              maxLength="200"
              name="short_description"
              placeholder="A short description for your event (max 200 characters)"
              value={formData.short_description}
            />
            <Upload setUrl={(url) => setUrl(url)}></Upload>
          </div>
          <div className="step second__step" style={{ display: step === 2 ? "grid" : "none" }}>
            <input
              onChange={handleChange}
              type="text"
              name="location"
              placeholder="Event's location"
              value={formData.location}
            />
            <input
              onChange={handleChange}
              type="date"
              name="date"
              placeholder="Event's date"
              value={formData.date}
              style={{ color: "white" }}
            />
            <input
              onChange={handleChange}
              type="number"
              name="price"
              placeholder="Participation fee in TND"
              value={formData.price}
            />
            <select onChange={handleChange} name="category" value={formData.category}>
              <option value="Sport">Sport</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Technology">Technology</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="step third__step" style={{ display: step === 3 ? "grid" : "none" }}>
            <textarea
              onChange={handleChange}
              name="description"
              placeholder="Describe your event in details"
              value={formData.description}
            />
          </div>
        </form>
        <div className="nav__buttons">
          <div
            className="btn"
            onClick={
              step > 1
                ? () => {
                    setStep(step - 1);
                  }
                : null
            }
            style={{ opacity: step === 1 ? 0 : 1, pointerEvents: step === 1 ? "none" : "all" }}
          >
            Back
          </div>
          <div
            className="btn"
            onClick={
              step < 3
                ? () => {
                    setStep(step + 1);
                  }
                : null
            }
            style={{ display: step === 3 ? "none" : "block", pointerEvents: step === 3 ? "none" : "all" }}
          >
            Next
          </div>
          <div className="btn btn-primary" onClick={handleSubmit} style={{ display: step === 3 ? "block" : "none" }}>
            Submit
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
