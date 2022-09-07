import { visit, print } from "recast";
import { parse } from "recast/parsers/babel";
import { getComponentChildren, standartComponents } from '.';
import { Props } from "./base/interfaces";

export const findComponentProps = (code: string, elIndex: number): Props => {
    try {
        const ast = parse(code);
        let attributes: any = {};
        let index = 0;
        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === elIndex) {
                    const standartComponent = standartComponents[print(element.value.name).code];
                    visit(element.node, {
                        visitJSXAttribute: (attribute) => {

                            const name = attribute.value.name.name as string;
                            const existedProp = standartComponent?.props?.[name];

                            let value = null;
                            let propType = null;

                            const attributeType = attribute.value.value?.type ?? 'none';
                            switch (attributeType) {
                                case "StringLiteral":
                                    propType = String;
                                    value = attribute.value.value.value;
                                    break;
                                case "JSXExpressionContainer":
                                    const expression = attribute.value.value.expression;
                                    if (expression.type === "StringLiteral") {
                                        value = expression.value;
                                        propType = String;
                                    }
                                    if (expression.type === "NumericLiteral") {
                                        value = expression.value;
                                        propType = Number;
                                    }
                                    if (expression.type === "BooleanLiteral") {
                                        value = expression.value;
                                        propType = Boolean;
                                    }
                                    if (expression.type === "ArrowFunctionExpression") {
                                        value = 'expr';
                                        propType = Function;
                                    }
                                    if (expression.type === "ObjectExpression") {
                                        value = print(expression).code;
                                        propType = Object;
                                    }
                                    if (expression.type === "Identifier") {
                                        value = expression.name;
                                        propType = Function;
                                    }
                                    break;
                                case "none":
                                    value = true;
                                    propType = Boolean;
                                    break;
                            }

                            attributes[name] = { ...existedProp, value, type: propType };

                            return false;
                        }
                    });


                    const childrenArr = getComponentChildren(element);
                    let children = {};

                    if (!childrenArr.length) {
                        children = standartComponent?.props['children'];
                    }
                    if (childrenArr.length === 1) {
                        const child = childrenArr[0];
                        switch (child.type) {
                            case 'JSXText':
                                children = {
                                    type: String,
                                    value: child.value
                                }
                                break;
                            case 'JSXExpressionContainer':
                                children = {
                                    type: Function,
                                    value: child.expression.name
                                }
                                break;
                        }
                    }
                    if (childrenArr.length > 1) {
                        children = {
                            type: Array,
                            value: ''
                        }
                    }

                    attributes = { ...standartComponent?.props, ...attributes, children };
                    this.abort();
                }
                index++;
                return false;
            }
        });

        return attributes;
    }
    catch (error) {
        // console.error(error);
        return {}
    }
};

export default findComponentProps;