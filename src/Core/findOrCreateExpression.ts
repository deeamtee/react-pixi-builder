import { prettyPrint, visit, types, parse as prs } from "recast";
import { parse } from "recast/parsers/babel";

type TemplateString = (identifier: string) => string;

const expressionTemplate = (identifier: string) => `const ${identifier} = React.useCallback((e) => { console.log('on ${identifier}'); }, [])`;


export const findOrCreateExpression = (code: string, elIndex: number, key: string, template: TemplateString = expressionTemplate, postfix?: string): [string, boolean] => {
    try {
        const ast = parse(code);
        let index = 0;

        const builders = types.builders;
        let visited = false;

        visit(ast, {
            visitJSXOpeningElement(element) {

                if (index === elIndex) {
                    const scope = element.scope;
                    visit(element.node, {
                        visitJSXAttribute: (attribute) => {
                            if (attribute.value.name.name === key) {
                                visited = true;
                                this.abort();
                            }
                            return false;
                        }
                    });

                    if (!visited) {
                        const namePart = `${key}${postfix ?? ''}`;
                        const length = scope.node.body.body.filter((node: any) => node.declarations && node.declarations[0].id.name.startsWith(namePart)).length;
                        const name = `${namePart}${length > 0 ? `_${length}` : ''}`;
                        const newAstFragment = parse(template(name));
                        const declaration = newAstFragment.program.body[0];

                        const attribute = builders.jsxAttribute(
                            builders.jsxIdentifier(key),
                            builders.jsxExpressionContainer(
                                builders.jsxIdentifier(name)
                            )
                        )

                        element.value.attributes.push(attribute);

                        //@ts-ignore
                        const idx = scope.node.body.body.findIndex((node: any) => node.loc.end.index > element.node.loc?.start.index);
                        scope.node.body.body.splice(idx, 0, declaration);

                        this.abort();

                    }
                }

                index++;
                return false;
            }
        });

        return [prettyPrint(ast).code, !visited];
    }
    catch (error) {
        // console.error(error);
        return [code, false];
    }
};

export default findOrCreateExpression;