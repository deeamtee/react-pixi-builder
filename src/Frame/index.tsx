import React from "react";
import ReactDOMClient from "react-dom/client";
import FrameContent from "./FrameContent";
import * as PIXI from "pixi.js";
import { Stage, Sprite } from "../react-pixi/components";
import { useTick, useApp } from "../react-pixi/utils/hooks";
import * as helpers from "../react-pixi/utils/helpers";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container as HTMLElement);
window["React"] = React;
window["ReactDOM"] = ReactDOMClient as any;
window["PIXI"] = PIXI;
window["ReactPIXI"] = { Stage, Sprite, useTick, useApp, helpers };

root.render(<FrameContent />);
