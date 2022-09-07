import React from "react";
import { IStandartComponents, Props } from "./interfaces";


const baseComponent: Props = {
    id: {
        type: String,
        value: ''
    },
    className: {
        type: String,
        value: ''
    },
    tabIndex: {
        type: Number,
        value: null
    },
    onClick: {
        type: Function,
        value: null
    },
    children: {
        type: React,
        value: null
    }
}

export const materialComponents: IStandartComponents = {
    'MaterialUI.Paper': {
        props: {
            ...baseComponent,
        },
        children: Infinity
    }
}