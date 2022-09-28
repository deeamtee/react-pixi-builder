import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./Containers";

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container as HTMLElement);

root.render(<App />);
