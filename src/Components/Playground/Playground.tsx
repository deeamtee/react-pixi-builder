import React from "react";

import "./style.css";

export const Playground: React.FC = () => {
  return (
    <>
      <iframe
        className="iframe"
        src="frame.html"
        allow="autoplay;camera;microphone;usb;gamepad;execution-while-not-rendered;images;allow-same-origin"
      />
    </>
  );
};

export default Playground;
