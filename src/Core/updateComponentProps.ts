import React from "react";
import { prettyPrint, visit, types, print } from "recast";
import { parse } from "recast/parsers/babel";
import { standartComponents } from "./base";
import getComponentChildren from "./getComponentChildren";

export const updateComponentProps = (code: string, elIndex: number, propName: string, type: any, value: any): any => {
    try {
        const ast = parse(code);
        let index = 0;

        const builders = types.builders;

        let visited = false;

        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === elIndex) {
                    const standartComponent = standartComponents[print(element.value.name).code];
                    if (propName !== 'children') {
                        visit(element.node, {
                            visitJSXAttribute: (attribute) => {
                                if (attribute.value.name.name === propName && value) {

                                    switch (type) {
                                        case String:
                                            attribute.value.value.value = String(value);
                                            break;
                                        case Number:
                                            attribute.value.value.expression.value = Number(value);
                                            break;
                                        case Boolean:
                                            attribute.value.value.expression.value = Boolean(value);
                                            break;
                                        case Object:
                                            // attribute.value.value.value = String(value);
                                            break;
                                    }

                                    visited = true;
                                }
                                if (attribute.value.name.name === propName && !value) {
                                    attribute.prune();
                                    visited = true;
                                    this.abort();
                                }


                                return false;
                            }
                        });

                        if (!visited) {

                            let newAttribute;

                            switch (type) {
                                case String:
                                    newAttribute = builders.jsxAttribute(
                                        builders.jsxIdentifier(propName),
                                        builders.stringLiteral(String(value))
                                    );
                                    break;
                                case Number:
                                    newAttribute = builders.jsxAttribute(
                                        builders.jsxIdentifier(propName),
                                        builders.jsxExpressionContainer(
                                            builders.numericLiteral(Number(value)))
                                    );
                                    break;
                                case Boolean:
                                    newAttribute = builders.jsxAttribute(
                                        builders.jsxIdentifier(propName)
                                    );
                                    break;
                                case Object:
                                    // newAttribute = builders.jsxAttribute(
                                    //     builders.jsxIdentifier(propName),
                                    //     builders.objectExpression(parse(value))
                                    // );
                                    break;
                            }

                            element.value.attributes.push(newAttribute);
                            this.abort();
                            return false;
                        }
                    }
                    else {
                        const childrenArr = getComponentChildren(element);
                        if (!childrenArr.length && standartComponent.props['children'].type === React) {
                            const text = builders.jsxText(String(value));
                            element.parent.value.children.push(text);
                            this.abort();
                            return false;
                        }
                        if (childrenArr.length === 1 && childrenArr[0].type === 'JSXText') {
                            childrenArr[0].value = value;
                            this.abort();
                            return false;
                        }
                    }
                }
                index++;
                return false;
            }
        });

        return prettyPrint(ast).code;
    }
    catch {
        return code;
    }
};

export default updateComponentProps;