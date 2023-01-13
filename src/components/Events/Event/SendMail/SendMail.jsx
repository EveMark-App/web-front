import React from "react";
import "./sendMail.css";
import { useState } from "react";
const SendMail = ({ id }) => {
  const [submissionResults, setsubmissionResults] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/event/mail/${id}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setsubmissionResults("Message Sent");
    }
    if (response.status === 401) {
      setsubmissionResults("Message Failed");
    }
    if (response.status === 500) {
      setsubmissionResults("No participants found!");
    }
  };
  return (
    <div className="send__mail">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          onChange={handleChange}
          value={formData.subject}
        />
        <textarea
          name="message"
          cols="30"
          rows="10"
          placeholder="Enter Message"
          onChange={handleChange}
          value={formData.message}
        ></textarea>
        <button className="btn btn-primary" type="submit">
          Send
        </button>
        <h5>{submissionResults}</h5>
      </form>
    </div>
  );
};

export default SendMail;
