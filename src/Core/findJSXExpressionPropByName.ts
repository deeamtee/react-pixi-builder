import { visit, } from "recast";

export const findJSXExpressionPropByName = (scope: any, name: string): any => {
    try {
        let node;
        visit(scope.node, {
            visitJSXExpressionContainer(expressionContainer) {
                if (expressionContainer.node.expression.name === name) {
                    node = expressionContainer;
                    this.abort();
                }
                return false;
            }
        });

        return node;
    }
    catch (error) {
        // console.error(error);
        return null;
    }
};

export default findJSXExpressionPropByName;