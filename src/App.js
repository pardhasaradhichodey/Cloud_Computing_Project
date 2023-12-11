// App.js

import React from "react";
import Carousel from "./Carousel";
import NavigationBar from "./NavigationBar";
import AuthPage from "./AuthPage";
const App = () => {
  return (
    <div>
      <NavigationBar />

      <header id="home">
        <h1>Civic Issue Reporting Platform</h1>
        <Carousel />
      </header>

      <section className="about" id="about">
        <h2>About Our Application</h2>
        <p>
          Welcome to our Civic Issue Reporting Platform! We are dedicated to
          making our community a better place by providing a platform for
          reporting and addressing civic issues. Whether it's a pothole on the
          road, a malfunctioning streetlight, or any other concern, our
          application is here to help you voice your concerns and contribute to
          the betterment of our neighborhood.
        </p>
        <p>
          Built using React, our web application is user-friendly, efficient,
          and designed to streamline the civic issue reporting process. We
          believe in the power of community collaboration, and with your help,
          we can create a more responsive and resilient local environment.
        </p>
      </section>
      <section className="login" id="login">
      <AuthPage/>
      </section>
    </div>
  );
};

export default App;
