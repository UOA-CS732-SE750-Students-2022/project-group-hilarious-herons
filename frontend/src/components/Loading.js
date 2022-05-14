import React from "react";
import lottie from "lottie-web";
import bellHotel from "../lottieFile/104530-hotel-bell.json";

export const Loading = () => {
  React.useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loading-logo"),
      animationData: bellHotel,
    });
  }, []);
  return (
    <div id="loading-logo" style={{ margin: "5rem auto", width: "22%" }} />
  );
};
