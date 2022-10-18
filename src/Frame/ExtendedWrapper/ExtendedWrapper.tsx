import React, { useRef } from "react";
import { standartComponents } from "../../Core";
import { Control } from "../Control";

const placeholder = "PLACEHOLDER";

export const ExtendedWrapper: React.FC = ({ children, ...attrs }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const type = attrs["data-builder-type"];
  const index = attrs["data-builder-index"];
  const componentData = standartComponents[type];
  const child = React.Children.only(children) as React.ReactElement;
  const allowChildren = componentData?.children;

  // Wrap ***
  let replacedProps = { ...child?.props };
  if (componentData) {
    Object.entries(componentData.props)
      .filter(([name, data]) => data.type === React)
      .forEach(([name, data]) => {
        if (name === "children" && allowChildren !== undefined) {
          // Wrap child ***
          replacedProps[name] = allowChildren
            ? replacedProps[name] ?? placeholder
            : undefined;
          return;
        }

        if (replacedProps[name]) {
          replacedProps[name] = (
            <ExtendedWrapper>
              <>{replacedProps[name]}</>
            </ExtendedWrapper>
          );
        } else {
          replacedProps[name] = (
            <ExtendedWrapper
              data-builder-type={type}
              data-builder-index={index}
              data-builder-slot={name}
            >
              <div>{placeholder}</div>
            </ExtendedWrapper>
          );
        }
      });
  }
  // Wrap ***

  const wrappedChildren = React.cloneElement(child, replacedProps);

  return (
    <>
      <div ref={ref} style={{ display: "contents" }}>
        {/* {wrappedChildren} */}
        {children}
      </div>
      {/* <Control elemRef={ref} {...(attrs as any)} /> */}
    </>
  );
};

export default ExtendedWrapper;
