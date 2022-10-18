import React, { useContext } from "react";
import { print, visit, types } from "recast";
import { transform, registerPreset, availablePresets } from "@babel/standalone";
import { parse } from "recast/parsers/babel";
import { FrameContext } from "./FrameContent";
// import * as ReactPIXI from "../react-pixi/components";
import ErrorBoundary from "./ErrorBoundary";

registerPreset("tsx", {
  presets: [
    [availablePresets["typescript"], { allExtensions: true, isTSX: true }],
  ],
});

export const wrap = (componentCode: string): React.FC<any> => {
  try {

    const ast = parse(componentCode);
    let index = 0;

    const builders = types.builders;

    visit(ast, {
      visitJSXOpeningElement: (element) => {

        const identifierInteractive = builders.jsxIdentifier("interactive");
        const attributeInteractive = builders.jsxAttribute(identifierInteractive);
        element.node.attributes?.push(attributeInteractive);

        const expressionTemplate = `(e) => window['contextValue']?.onSelect(${index})`;
        const fragment = parse(expressionTemplate);
        const identifierOnClick = builders.jsxIdentifier("onClick");
        const expressionOnClick = builders.jsxExpressionContainer(fragment.program.body[0].expression);
        const attributeOnClick = builders.jsxAttribute(identifierOnClick, expressionOnClick);
        element.node.attributes?.push(attributeOnClick);

        index++;
        return false;
      }
    });

    const newCode = print(ast).code;

    const transformed = transform(newCode, {
      presets: ["env", "react", "tsx"],
    });

    ////////////////////////////////
    const func = new Function("React", "ReactPIXI", `${transformed.code} return Component;`);
    const Wrapped = func(React, window["ReactPIXI"]);
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
