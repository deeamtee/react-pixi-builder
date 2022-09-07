import { visit } from "recast";
import { parse } from "recast/parsers/babel";

export const getSlotFromIndex = (code: string, idx: number): string => {
    let index = 0;
    let slot = 'undefined';
    try {
        const ast = parse(code);
        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === idx) {
                    this.abort();
                }
                index++;
                return false;
            }
        });

        return slot;
    }
    catch (error) {
        // console.error(error);
        return slot;
    }
};

export default getSlotFromIndex;