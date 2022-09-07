import React from "react";
import { print, visit, types } from "recast";
import { transform, registerPreset, availablePresets } from "@babel/standalone";
import { parse } from "recast/parsers/babel";

import * as ViennaUI from 'vienna-ui';
import { ExtendedWrapper } from "./ExtendedWrapper";
import ErrorBoundary from "./ErrorBoundary";

registerPreset("tsx", {
    presets: [
        [availablePresets["typescript"], { allExtensions: true, isTSX: true }]
    ]
});

const createExtendWrapper = (builders: typeof types.builders, children: any): types.namedTypes.JSXElement => {

    if (children.extra) {
        children.extra.parenthesized = false;
    }

    return builders.jsxElement(
        builders.jsxOpeningElement(
            builders.jsxIdentifier("ExtendedWrapper"),
            [],
            false
        ),
        builders.jsxClosingElement(
            builders.jsxIdentifier("ExtendedWrapper")
        ),
        [children]
    );
}

export const wrap = (componentCode: string): React.FC<any> => {
    try {
        const ast = parse(componentCode);
        let index = 0;

        const builders = types.builders;

        visit(ast, {
            visitJSXOpeningElement: (element) => {

                const elementName = print(element.value.name);


                // createPlaceholder(builders, element.parent);
                const finalElement = createExtendWrapper(builders, element.parent.node);

                const identifierStartLine = builders.jsxIdentifier("data-builder-start-line");
                const valueStartLine = builders.literal(`${element.value.loc.start.line}`);
                const attributeStartLine = builders.jsxAttribute(identifierStartLine, valueStartLine);
                finalElement.attributes?.push(attributeStartLine);

                const identifierStartColumn = builders.jsxIdentifier("data-builder-start-column");
                const valueStartColumn = builders.literal(`${element.value.loc.start.column}`);
                const attributeStartColumn = builders.jsxAttribute(identifierStartColumn, valueStartColumn);
                finalElement.attributes?.push(attributeStartColumn);

                const identifierEndLine = builders.jsxIdentifier("data-builder-end-line");
                const valueEndLine = builders.literal(`${element.value.loc.start.line}`);
                const attributeEndLine = builders.jsxAttribute(identifierEndLine, valueEndLine);
                finalElement.attributes?.push(attributeEndLine);

                const identifierEndColumn = builders.jsxIdentifier("data-builder-end-column");
                const valueEndColumn = builders.literal(`${element.value.loc.start.column}`);
                const attributeEndColumn = builders.jsxAttribute(identifierEndColumn, valueEndColumn);
                finalElement.attributes?.push(attributeEndColumn);

                const identifierType = builders.jsxIdentifier("data-builder-type");
                const valueType = builders.literal(`${elementName}`);
                const attributeType = builders.jsxAttribute(identifierType, valueType);
                finalElement.attributes?.push(attributeType);

                const identifierIndex = builders.jsxIdentifier("data-builder-index");
                const valueIndex = builders.literal(`${index}`);
                const attributeIndex = builders.jsxAttribute(identifierIndex, valueIndex);
                finalElement.attributes?.push(attributeIndex);

                element.parent.replace(finalElement);

                index++;
                return false;
            }
        });

        const newCode = print(ast).code;

        const transformed = transform(newCode, {
            presets: ["env", "react", "tsx"]
        });

        ////////////////////////////////
        const func = new Function("React", "ExtendedWrapper", "ViennaUI", "MaterialUI", `${transformed.code} return Component;`);
        const Wrapped = func(React, ExtendedWrapper, ViennaUI, window['MaterialUI']);
        ////////////////////////////////

        return (props) => (
            <ErrorBoundary>
                <Wrapped {...props} />
            </ErrorBoundary>
        );
    } catch (error) {
        // console.error(error);
        return () => <div>wait</div>;
    }
};

export default wrap;
