import { visit } from "recast";
import { parse } from "recast/parsers/babel";

export const getIndexByPos = (code: string, line: number, col: number): number => {
    try {
        const ast = parse(code);
        let index = 0;
        visit(ast, {
            visitJSXOpeningElement(element) {
                if (
                    line >= Number(element.value.loc.start.line) &&
                    col >= Number(element.value.loc.start.column) &&
                    line <= Number(element.value.loc.end.line) &&
                    col <= Number(element.value.loc.end.column)) {
                    this.abort();
                }
                index++;
                return false;
            }
        });

        return index;
    }
    catch (error) {
        // console.error(error);
        return -1;
    }
};

export default getIndexByPos;