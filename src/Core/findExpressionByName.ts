import { visit, } from "recast";

export const findExpressionByName = (scope: any, name: string): any => {
    try {
        let node;
        visit(scope.node, {
            visitVariableDeclarator(declaration) {
                if (declaration.node.id.name === name) {
                    node = declaration;
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

export default findExpressionByName;