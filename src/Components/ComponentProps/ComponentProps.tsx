import React from "react";
import { findComponentProps } from "../../Core";
import { constructInput } from "./ComponentPropsInputs";
import { Groups } from "vienna-ui";

interface Props {
  index: number;
  code: string;
  onChange(index: number, key: string, type: any, value: any): void;
  onExpression(index: number, key: string): void;
  onRemoveExpression(index: number, key: string): void;
}

export const ComponentProps: React.FC<Props> = ({
  index,
  code,
  onChange,
  onExpression,
  onRemoveExpression,
}) => {
  if (index !== undefined) {
    const componentProps = findComponentProps(code, index);

    return (
      <Groups design="vertical" height="auto" alignItems="center">
        {Object.entries(componentProps).map(([key, data]) => {
          const deps = data.depends ? Object.entries(data.depends) : [];
          const disabled =
            deps.length > 0
              ? !deps.some(([propName, values]) =>
                  values.includes(componentProps[propName]?.value)
                )
              : false;
          return constructInput(
            key,
            data,
            index,
            disabled,
            onChange,
            onExpression,
            onRemoveExpression
          );
        })}
      </Groups>
    );
  }

  return <></>;
};

export default ComponentProps;
