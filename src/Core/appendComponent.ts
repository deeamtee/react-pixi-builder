import { print, prettyPrint, visit, types } from "recast";
import { parse } from "recast/parsers/babel";
import findOrCreateExpression from "./findOrCreateExpression";

export const appendComponent = (
  code: string,
  idx: number,
  type: string,
  newElementName: string,
  slot: string
): string => {
  try {
    const ast = parse(code);
    let index = 0;
    const builders = types.builders;
    console.log("type", type);

    visit(ast, {
      visitJSXOpeningElement(element) {
        if (index === idx && print(element.value.name).code === type) {
          const newElement = builders.jsxElement(
            builders.jsxOpeningElement(builders.jsxIdentifier(newElementName)),
            builders.jsxClosingElement(builders.jsxIdentifier(newElementName))
          );
          if (slot === "undefined") {
            const parent = element.parent;
            parent.value.children.push(newElement);
            code = prettyPrint(ast).code;
          } else {
            const template = (identifier: string) =>
              `const ${identifier} = ${prettyPrint(newElement)}`;
            const [newCode, isNew] = findOrCreateExpression(
              code,
              idx,
              slot,
              template
            );
            code = isNew ? newCode : code;
          }
          this.abort();
        }
        index++;
        return false;
      },
    });

    return code;
  } catch (error) {
    // console.error(error);
    return code;
  }
};

export default appendComponent;
