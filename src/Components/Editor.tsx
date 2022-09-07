import React, { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { editor, languages, Selection, Uri } from 'monaco-editor';
import { getIndexByPos } from '../Core';

export interface EditorRef {
    setPosition(startLine: number, startColumn: number, endLine: number, endColumn: number): void;
    focus(): void;
}

interface Props {
    ref: React.Ref<EditorRef>;
    code: string;
    onChange(value: string): void;
    onCursor(index: number): void;
}

// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId: any, label: string) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};

export const Editor: React.FC<Props> = React.forwardRef(({ code, onChange, onCursor }, ref) => {

    const refRoot = useRef<HTMLDivElement>(null);
    const refEditor = useRef<editor.IStandaloneCodeEditor>();
    const refEvents = useRef<any>({ onDidChangeModelContent: null, onDidChangeCursorPosition: null });

    const modelContentChangeHandler = useCallback((e: editor.IModelContentChangedEvent) => {
        onChange?.(refEditor.current?.getValue() ?? '');
    }, [])

    const cursorPositionChangeHandler = (e: editor.ICursorPositionChangedEvent) => {
        if (e.source !== 'model') {
            onCursor?.(getIndexByPos(code, e.position.lineNumber, e.position.column));
        }
    };

    useEffect(() => {
        if (refRoot.current) {

            languages.typescript.typescriptDefaults.setCompilerOptions({
                jsx: languages.typescript.JsxEmit.React,
            });

            languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                noSemanticValidation: true,
                noSyntaxValidation: false,
            })

            refEditor.current = editor.create(refRoot.current, {
                language: 'typescript',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                model: editor.createModel(code, 'typescript', Uri.parse("file:///main.tsx")),
            });
        }
    }, []);

    useEffect(() => {
        if (refEditor.current && code !== refEditor.current.getValue()) {
            const model = refEditor.current.getModel();
            model?.setValue(code);
            refEditor.current.setModel(model);
        }
    }, [code]);


    useEffect(() => {
        if (refEditor.current) {
            refEvents.current.onDidChangeModelContent?.dispose();
            refEvents.current.onDidChangeCursorPosition?.dispose();
            refEvents.current.onDidChangeModelContent = refEditor.current.onDidChangeModelContent(modelContentChangeHandler);
            refEvents.current.onDidChangeCursorPosition = refEditor.current.onDidChangeCursorPosition(cursorPositionChangeHandler);
        }
    }, [code]);

    useImperativeHandle(ref, () => ({
        setPosition: (startLine: number, startColumn: number, endLine: number, endColumn: number) => {
            const selection = new Selection(startLine, startColumn, endLine, endColumn);
            refEditor.current?.setSelection(selection);
        },
        focus: () => { refEditor.current?.focus(); },
    }));

    return <div ref={refRoot} style={{ width: '100%', height: '100%' }} />;

});

export default Editor;