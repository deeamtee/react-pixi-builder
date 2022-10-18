import React from "react";
import { print, visit, types } from "recast";
import { transform, registerPreset, availablePresets } from "@babel/standalone";
import { parse } from "recast/parsers/babel";

import * as ViennaUI from "vienna-ui";
// import * as ReactPIXI from "../react-pixi/components";
import { ExtendedWrapper } from "./ExtendedWrapper";
import ErrorBoundary from "./ErrorBoundary";

registerPreset("tsx", {
  presets: [
    [availablePresets["typescript"], { allExtensions: true, isTSX: true }],
  ],
});

const createExtendWrapper = (
  builders: typeof types.builders,
  children: any
): types.namedTypes.JSXElement => {
  if (children.extra) {
    children.extra.parenthesized = false;
  }

  return builders.jsxElement(
    builders.jsxOpeningElement(
      builders.jsxIdentifier("ExtendedWrapper"),
      [],
      false
    ),
    builders.jsxClosingElement(builders.jsxIdentifier("ExtendedWrapper")),
    [children]
  );
};

export const wrap = (componentCode: string): React.FC<any> => {
  try {
    const newCode = componentCode;

    const transformed = transform(newCode, {
      presets: ["env", "react", "tsx"],
    });

    ////////////////////////////////
    const func = new Function(
      "React",
      "ExtendedWrapper",
      "ViennaUI",
      "ReactPIXI",
      "MaterialUI",
      `${transformed.code} return Component;`
    );
    const Wrapped = func(
      React,
      ExtendedWrapper,
      ViennaUI,
      window["ReactPIXI"],
      window["MaterialUI"]
    );
    ////////////////////////////////

    return (props) => (
      <ErrorBoundary>
        <Wrapped {...props} />
      </ErrorBoundary>
    );
  } catch (error) {
    // console.error(error);
    return () => <div>wait</div>;
  }
};

export default wrap;
