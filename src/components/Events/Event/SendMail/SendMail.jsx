import React from "react";
import "./sendMail.css";
import { useState } from "react";
const SendMail = (id) => {
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
    const response = await fetch(`https://evemark.fun/api/event/:${id}/send`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ ...formData, id }),
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
  };
  return (
    <div className="send__mail">
      <form action="">
        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          onChange={handleChange}
          value={formData.subject}
        />
        <textarea
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="Enter Message"
          onChange={handleChange}
          value={formData.message}
        ></textarea>
        <div className="btn btn-primary" type="submit">
          Send
        </div>
        <h5>{submissionResults}</h5>
      </form>
    </div>
  );
};

export default SendMail;
