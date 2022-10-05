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
// root.render(<App />);

// function App() {
//   return (
//     <Stage options={{ backgroundColor: 0x292c33 }}>
//       <Sprite
//         img={
//           "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAnxJREFUWEftVs9rE1EQ/uZt0lD0oh5qSypezE16qE2y1T+hFqzZSgVPHvSqntwVCcWsJ/WqB0+CpU2siP4JYrapCsVbvIgt1R7Ui1LSJG9kQze8DemySaQi5h3nzY/vzTdvZgh/+VAn8WfGc8Os0XEA5ecl85tqey5pHwGQoDp/Wn5nfQnrtyMA59O5a4LoPtflbKF0K68GySTvGKSJJcl8/ZljPegDCJ0BQ7fzzCgXHNNqZ+RyG9HwsHHHOAHCGJgdEG349JnjIEqDsQbCR/euVsfV1lrxbDKTdo4YCTJ0mwEU80Vzsh2AmVQ2romB9bAvUvXqcmd0eSXrB7qrYOj2GwB6IICMnlslUBzA0W4AAPjK4I1C0ZpotQ8EcPHM3UM/uTIYkwOrAEa6DO6ZbVbEzsRBim0/fX3zhycMBJBJ20tEMHoM3FIiyBccc/YfBsAok6CX3guYeU6hZ5OIFpp3ks+CkFBTwNxjBvZysBvE94vaUdgHsGcGpk9nR6IyelKAHiucHQYwGIbDsBQA2Abw3fMpwZerovqhMQ2N1Pw4ROTFfgIQzNOLjvW+7TjupIjCZqCVAu+xoQG480JKec8zFCTs5ldjlCVLs3knxA23zwdR2A2Anhrjn8hAH8D+ZcAbx27EWC02DMFv/dH5SkVUX6mymIxOAfTIpyfpVCVSaWzIreM4sAhVJ+02oqCtWLUN2oj6AIL7gG5PuRtrQ4lYIxJDamqpVn2yWLq9psouJOfHOBK95G8+cgtMdVfGhHKhaPrqpuG+XWn7WjFjPe+Yx7r5Akba/gzCaANAy0ISvhP+lwDUPnCgFq0vrFhb3VAwl8oN/YpUtaA+8BuA3gvMK1fAmgAAAABJRU5ErkJggg=="
//         }
//         width={180}
//         height={150}
//         x={0}
//         y={250}
//       />
//     </Stage>
//   );
// }
