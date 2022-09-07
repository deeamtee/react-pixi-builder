import { prettyPrint, visit } from "recast";
import { parse } from "recast/parsers/babel";
import { findExpressionByName } from ".";

export const removeExpresiionFromComponent = (code: string, idx: number, name: string): string => {
    try {
        const ast = parse(code);
        let index = 0;

        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === idx) {

                    visit(element.node, {
                        visitJSXAttribute(attribute) {
                            if (attribute.node.name.name === name) {
                                const exprNode = findExpressionByName(element.scope, attribute.value.value.expression.name);
                                attribute.prune();
                                exprNode?.parent.prune();
                                this.abort();
                            }
                            return false;
                        }
                    });
                    this.abort();
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

export default removeExpresiionFromComponent;