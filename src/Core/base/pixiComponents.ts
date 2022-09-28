import React from "react";
import { IStandartComponents, Props } from "./interfaces";

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
};
