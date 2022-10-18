import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ComponentProps,
  Editor,
  EditorRef,
  Playground,
} from "../../Components";
import {
  appendComponent,
  updateComponentProps,
  removeComponent,
  findOrCreateExpression,
  getPositionByIndex,
  getTypeFromIndex,
  getSlotFromIndex,
  removeExpresiionFromComponent,
} from "../../Core";
import { model } from "../../__mock__/model";

import "./style.css";

interface Selected {
  index: number;
  slot: string;
  type: string;
}

interface Context {
  onChange?(index: number, type: string, name: string, slot: string): void;
  onRemoveComponent?(index: number, slot: string): void;
  onSelect?(index: number, type: string, slot: string): void;
  selected?: Selected;
}

export const PlaygroundContext = React.createContext<Context>({});

export const App = () => {
  const refEditor = useRef<EditorRef>(null);
  const [code, setCode] = useState(model);
  const [selected, setSelected] = useState<Selected>();
  const [frameInit, setFrameInit] = useState(false);

  // Вызывается в onChange
  // в appendComponent переписываю генерацию
  const playgroundChangeHandler = useCallback(
    (index: number, type: string, name: string, slot: string) => {
      console.log(index);

      return setCode((code) => appendComponent(code, index, type, name, slot));
    },
    []
  );

  const playgroundRemoveHandler = useCallback(
    (index: number, slot: string) =>
      setCode((code) => removeComponent(code, index, slot)),
    []
  );

  const playgroundSelectHandler = useCallback(
    (index: number, type: string, slot: string) => {
      if (refEditor.current) {
        refEditor.current.setPosition(...getPositionByIndex(code, index));
        refEditor.current.focus();
      }
      setSelected((curSelected) =>
        curSelected?.index === index ? curSelected : { index, slot, type }
      );
    },
    [code]
  );

  const cursorChangeHandler = useCallback(
    (index: number) => {
      setSelected((curSelected) =>
        curSelected?.index === index
          ? curSelected
          : {
              index,
              type: getTypeFromIndex(code, index),
              slot: getSlotFromIndex(code, index),
            }
      );
    },
    [code]
  );

  const propertyChangeHandler = useCallback(
    (index: number, key: string, type: any, value: any) => {
      setCode((code) => updateComponentProps(code, index, key, type, value));
    },
    []
  );

  const createExpressionHandler = useCallback(
    (index: number, key: string, template?: any) => {
      const [newCode, isNew] = findOrCreateExpression(
        code,
        index,
        key,
        template,
        "Handler"
      );
      if (isNew) {
        setCode(newCode);
      }
    },
    [code]
  );

  const removeExpressionHandler = useCallback(
    (index: number, slot: string) =>
      setCode((code) => removeExpresiionFromComponent(code, index, slot)),
    []
  );

  const context = useMemo(
    (): Context => ({
      onChange: playgroundChangeHandler,
      onSelect: playgroundSelectHandler,
      onRemoveComponent: playgroundRemoveHandler,
      selected,
    }),
    [
      playgroundChangeHandler,
      playgroundSelectHandler,
      playgroundRemoveHandler,
      selected,
    ]
  );

  window["setFrameContext"]?.(context);
  window["setFrameInit"] = setFrameInit;

  useEffect(() => {
    window.parent["setCode"]?.(code);
  }, [code, frameInit]);

  return (
    <PlaygroundContext.Provider value={context}>
      <div className="main">
        <div className="editor">
          <Editor
            ref={refEditor}
            code={code}
            onChange={setCode}
            onCursor={cursorChangeHandler}
          />
        </div>
        <div className="result">
          <div className="playground">
            <Playground code={code} />
          </div>
          <div className="props">
            {selected && (
              <ComponentProps
                code={code}
                {...selected}
                onExpression={createExpressionHandler}
                onRemoveExpression={removeExpressionHandler}
                onChange={propertyChangeHandler}
              />
            )}
          </div>
        </div>
      </div>
    </PlaygroundContext.Provider>
  );
};

export default App;
