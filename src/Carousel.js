// Carousel.js

import React from "react";
import Carousel from "react-bootstrap/Carousel"; // Make sure to install 'react-bootstrap' package

//import image2 from './images/images1.jpeg';
const PhotoCarousel = () => {
  const carouselItemStyle = {
    height: "430px", // Adjust the height as needed
  };
  const carouselInterval = 2000;
  return (
    <Carousel interval={carouselInterval}>
      <Carousel.Item style={carouselItemStyle}>
        <img className="d-block w-100" src="/images.png" alt="First slide" />
        <Carousel.Caption>
          <h3>Explore Your Community</h3>
          <p>Discover and report civic issues in your neighborhood.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={carouselItemStyle}>
        <img className="d-block w-100" src="/images1.png" alt="Second slide" />
        <Carousel.Caption>
          <h3>Make a Difference</h3>
          <p>Contribute to the improvement of your local environment.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* Add more Carousel.Items as needed */}
    </Carousel>
  );
};

export default PhotoCarousel;
