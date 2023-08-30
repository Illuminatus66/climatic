import React from "react";

const AboutAuth = () => {
  return (
    <div className="auth-container-1">
      <h1 style={{ fontSize: "30px", color: "#7b36fc" }}>Join the Climatic™ community now!</h1>
      <p>Map element sourced from Mapbox's API.</p>
      <p>Get the data for today and the next day via Tomorrow.io</p>
      <p>Sign in- to search for weather around the world</p>
      <p>Save historical data in JSON, CSV and Excel format</p>
      <p style={{ fontSize: "13px", color: "#666767" }}>
        A maximum of 5 interactions are allowed per user, per day.
      </p>
      <p style={{ fontSize: "13px", color: "#007ac6" }}>
        Storage solutions provided by MongoDB. Hosted on Netlify.
      </p>
    </div>
  );
};

export default AboutAuth;
