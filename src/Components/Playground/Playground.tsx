import React from "react";

import './style.css';

export const Playground: React.FC = () => {

    return (
        <>
            <iframe className="iframe" src="frame.html" allow="autoplay;camera;microphone;usb;gamepad;execution-while-not-rendered" />
        </>
    );
}

export default Playground;