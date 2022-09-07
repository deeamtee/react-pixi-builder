import { visit, print } from "recast";
import { parse } from "recast/parsers/babel";

export const getTypeFromIndex = (code: string, idx: number): string => {
    let index = 0;
    let type = '';
    try {
        const ast = parse(code);
        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === idx) {
                    type = print(element.value.name).code;
                    this.abort();
                }
                index++;
                return false;
            }
        });

        return type;
    }
    catch (error) {
        // console.error(error);
        return type;
    }
};

export default getTypeFromIndex;