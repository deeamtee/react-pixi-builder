import { visit } from "recast";
import { parse } from "recast/parsers/babel";

export const getPositionByIndex = (code: string, idx: number): [number, number, number, number] => {
    let index = 0;
    let pos: any = [0, 0, 0, 0];
    try {
        const ast = parse(code);
        visit(ast, {
            visitJSXOpeningElement(element) {
                if (index === idx) {
                    pos[0] = Number(element.value.loc.start.line);
                    pos[1] = Number(element.value.loc.start.column) + 1;
                    pos[2] = Number(element.value.loc.end.line);
                    pos[3] = Number(element.value.loc.end.column) + 1;
                    this.abort();
                }
                index++;
                return false;
            }
        });

        return pos;
    }
    catch (error) {
        // console.error(error);
        return pos;
    }
};

export default getPositionByIndex;