import React from "react";
import { IStandartComponents, Props } from "./interfaces";

const baseComponent: Props = {
  id: {
    type: String,
    value: "",
  },
  className: {
    type: String,
    value: "",
  },
  tabIndex: {
    type: Number,
    value: null,
  },
  onClick: {
    type: Function,
    value: null,
  },
  children: {
    type: React,
    value: null,
  },
};

const inputDesigProps: Props = {
  design: {
    type: String,
    value: "",
    builInValues: ["material", "outline"],
  },
};

const sizeProps: Props = {
  size: {
    type: String,
    value: "",
    builInValues: ["s", "m", "l"],
  },
};

const baseInputComponent: Props = {
  disabled: {
    type: Boolean,
    value: false,
  },
  onChange: {
    type: Function,
    value: null,
  },
};

export const viennaComponents: IStandartComponents = {
  "ViennaUI.Input": {
    props: {
      ...baseComponent,
      ...sizeProps,
      ...inputDesigProps,
      ...baseInputComponent,
      placeholder: {
        type: String,
        value: "",
      },
      value: {
        type: String,
        value: "",
      },
      defaultValue: {
        type: String,
        value: "",
      },
    },
    children: null,
  },
  "ViennaUI.Heading": {
    props: {
      ...baseComponent,
    },
    children: null,
  },
  "ViennaUI.Text": {
    props: {
      ...baseComponent,
    },
    children: null,
  },
  "ViennaUI.Groups": {
    props: {
      ...baseComponent,
      design: {
        value: "",
        type: String,
        builInValues: ["vertical", "horizontal"],
      },
      alignItems: {
        value: "",
        type: String,
        builInValues: [
          "normal",
          "inherit",
          "initial",
          "unset",
          "stretch",
          "center",
          "flex-start",
          "flex-end",
          "self-start",
          "self-end",
          "baseline",
          "",
        ],
      },
      justifyContent: {
        value: "",
        type: String,
        builInValues: [
          "normal",
          "inherit",
          "initial",
          "unset",
          "center",
          "flex-start",
          "flex-end",
          "space-between",
          "space-around",
          "",
        ],
      },
      height: {
        value: "",
        type: String,
        builInValues: ["full", "auto", ""],
      },
    },
    children: Infinity,
  },
  "ViennaUI.Button": {
    props: {
      ...baseComponent,
      ...baseInputComponent,
      ...sizeProps,
      design: {
        value: "",
        type: String,
        builInValues: [
          "accent",
          "primary",
          "critical",
          "ghost",
          "outline",
          "checko",
        ],
      },
    },
    children: Infinity,
  },
  "ViennaUI.Card": {
    props: {
      ...baseComponent,
      ...{
        footer: { type: React, value: "" },
        header: { type: React, value: "" },
        title: { type: String, value: "" },
        actions: { type: React, value: "" },
        stretch: { type: Boolean, value: false },
      },
    },
    children: Infinity,
  },
  "ViennaUI.Checkbox": {
    props: {
      ...baseComponent,
      ...sizeProps,
      ...{ checked: { type: Boolean, value: false } },
    },
    children: Infinity,
  },
  "ViennaUI.Switcher": {
    props: {
      ...baseComponent,
      ...sizeProps,
      ...{ checked: { type: Boolean, value: false } },
    },
    children: Infinity,
  },
  "ViennaUI.Radio": {
    props: {
      ...baseComponent,
      ...sizeProps,
      ...{ checked: { type: Boolean, value: false } },
    },
    children: Infinity,
  },
  "ViennaUI.Grid.Row": {
    props: {
      ...baseComponent,
      align: {
        value: "",
        type: String,
        builInValues: [
          "left",
          "center",
          "right",
          "around",
          "between",
          "stretch",
          "",
        ],
      },
      valign: {
        value: "",
        type: String,
        builInValues: ["top", "middle", "bottom", ""],
      },
      columnGap: {
        value: "",
        type: String,
      },
      rowGap: {
        value: "",
        type: String,
      },
    },
    children: ["ViennaUI.Grid.Col"],
  },
  "ViennaUI.Grid.Col": {
    props: {
      ...baseComponent,
      size: {
        value: "",
        type: String,
        builInValues: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "auto",
          "",
        ],
      },
      offset: {
        value: "",
        type: String,
        builInValues: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "",
        ],
      },
    },
    children: Infinity,
  },
  "ViennaUI.FormField": {
    props: { ...baseComponent },
    children: [
      "ViennaUI.FormField.Label",
      "ViennaUI.FormField.Message",
      "ViennaUI.FormField.Content",
    ],
  },
  "ViennaUI.FormField.Label": {
    props: {
      ...baseComponent,
      required: {
        type: Boolean,
        value: false,
      },
    },
    children: Infinity,
  },
  "ViennaUI.FormField.Message": {
    props: {
      ...baseComponent,
      align: {
        value: "",
        type: String,
        builInValues: ["left", "center", "right", ""],
      },
      color: {
        value: "",
        type: String,
        builInValues: ["warning", "critical", ""],
      },
    },
    children: Infinity,
  },
  "ViennaUI.FormField.Content": {
    props: { ...baseComponent },
    children: Infinity,
  },
};
