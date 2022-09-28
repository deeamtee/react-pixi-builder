import React from "react";
import ReactDOMClient from "react-dom/client";
import FrameContent from "./FrameContent";
import * as PIXI from "pixi.js";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container as HTMLElement);
window["React"] = React;
window["ReactDOM"] = ReactDOMClient as any;
window["PIXI"] = PIXI;

root.render(<FrameContent />);
