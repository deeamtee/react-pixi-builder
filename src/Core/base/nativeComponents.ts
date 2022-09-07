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

const baseInputComponent: Props = {
    disabled: {
        type: Boolean,
        value: false
    },
    type: {
        type: String,
        value: '',
        builInValues: ['text', 'radio', 'checkbox']
    },
    placeholder: {
        type: String,
        value: '',
        depends: {
            type: ['text', '']
        }
    },
    value: {
        type: String,
        value: '',
        depends: {
            type: ['text', '']
        }
    },
    defaultValue: {
        type: String,
        value: ''
    },
    checked: {
        type: Boolean,
        value: false,
        depends: {
            type: ['radio', 'checkbox']
        }
    },
    defaultChecked: {
        type: Boolean,
        value: '',
        depends: {
            type: ['radio', 'checkbox']
        }
    },
    onChange: {
        type: Function,
        value: null
    },
}

export const nativeComponents: IStandartComponents = {
    'div': {
        props: { ...baseComponent },
        children: Infinity,
        namespace: ['native', 'отображение']
    },
    'span': {
        props: { ...baseComponent },
        children: Infinity,
        namespace: ['native', 'отображение']
    },
    'ul': {
        props: { ...baseComponent },
        children: ['li'],
        namespace: ['native', 'отображение']
    },
    'li': {
        props: { ...baseComponent },
        children: Infinity,
        namespace: ['native', 'отображение']
    },
    'label': {
        props: { ...baseComponent, ...{ htmlFor: { type: String, value: '' } } },
        children: Infinity,
        namespace: ['native', 'отображение']
    },
    'input': {
        props: { ...baseComponent, ...baseInputComponent },
        children: null,
        namespace: ['native', 'ввод']
    },
    'button': {
        props: { ...baseComponent, ...baseInputComponent },
        children: null,
        namespace: ['native', 'ввод']
    },
    'video': {
        props: {
            ...baseComponent,
            width: {
                type: String,
                value: ''
            },
            height: {
                type: String,
                value: ''
            },
            controls: {
                type: Boolean,
                value: false
            },
            autoPlay: {
                type: Boolean,
                value: false
            },
            loop: {
                type: Boolean,
                value: false
            },
            src: {
                type: String,
                value: ''
            }

        },
        children: ['source'],
        namespace: ['native', 'медиа']
    },
    'source': {
        props: {
            ...baseComponent,
            type: {
                type: String,
                value: ''
            },
            src: {
                type: String,
                value: ''
            }
        },
        children: null,
        namespace: ['native', 'медиа']
    },
    'img': {
        props: {
            ...baseComponent
            ,
            src: {
                type: String,
                value: ''
            }
        },
        children: null,
        namespace: ['native', 'медиа']
    }
};
