import React from "react";
import { IStandartComponents } from "./interfaces";

const stage: any = {
  width: {
    type: Number,
    value: 600,
  },
  height: {
    type: Number,
    value: 600,
  },
  options: {
    type: Object,
    value: null,
  },
  children: {
    type: React,
    value: Infinity,
  },
};

const sprite: any = {
  width: {
    type: Number,
    value: 100,
  },
  height: {
    type: Number,
    value: 100,
  },
  x: {
    type: Number,
    value: 0,
  },
  y: {
    type: Number,
    value: 0,
  },
  rotation: {
    type: Number,
    value: 0,
  },
  img: {
    type: String,
    value: "",
  },
  onClick: {
    type: Function,
    value: null,
  },
  children: {
    type: React,
    value: 0,
  },
};

const text: any = {
  x: {
    type: Number,
    value: 0,
  },
  y: {
    type: Number,
    value: 0,
  },
  text: {
    type: String,
    value: "",
  },
  style: {
    type: String,
    value: "",
  },
  canvas: {
    type: String,
    value: "",
  },
  children: {
    type: React,
    value: 0,
  },
};

const graphics: any = {
  x: {
    type: Number,
    value: 0,
  },
  y: {
    type: Number,
    value: 0,
  },
  fill: {
    type: String,
    value: "",
  },
  rotation: {
    type: String,
    value: "",
  },
  drawRect: {
    type: String,
    value: null,
  },

  children: {
    type: React,
    value: 0,
  },
};

export const pixiComponents: IStandartComponents = {
  "ReactPIXI.Stage": {
    props: { ...stage },
    children: Infinity,
  },
  "ReactPIXI.Sprite": {
    props: { ...sprite },
    children: null,
  },
  text: {
    props: { ...text },
    children: null,
  },
  graphics: {
    props: { ...graphics },
    children: null,
  },
};
