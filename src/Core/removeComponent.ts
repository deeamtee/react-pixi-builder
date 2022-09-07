import { prettyPrint, visit } from "recast";
import { parse } from "recast/parsers/babel";
import { findJSXExpressionPropByName } from ".";

export const removeComponent = (code: string, idx: number, slot: string): string => {
    try {
        const ast = parse(code);
        let index = 0;

        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === idx) {
                    const parent = element.parent;

                    if (parent.parent.node.type === 'VariableDeclarator') {
                        const name = parent.parent.value.id.name;
                        const exprNode = findJSXExpressionPropByName(element.scope, name);
                        if (exprNode) {
                            exprNode.parent.prune();
                        }
                        parent.parent.prune();

                    }
                    else {
                        parent.prune();
                    }
                }
                index++;
                return false;
            }
        });

        return prettyPrint(ast).code;
    }
    catch (error) {
        // console.error(error);
        return code;
    }
};

export default removeComponent;