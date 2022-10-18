import React, { useEffect, useState } from "react";
import wrap from "./Wrapper";

import "./style.css";
import { Control } from "./Control";

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

export const FrameContext = React.createContext<Context>({});

export const FrameContent = () => {
  const [code, setCode] = useState("");
  const [contextValue, setContextValue] = useState({});

  window.parent["setFrameContext"] = setContextValue;
  window.parent["setCode"] = setCode;

  useEffect(() => {
    window.parent["setFrameInit"]?.(true);
  }, []);

  const Wrapped = wrap(code);
  window['contextValue'] = contextValue;

  return (
    <FrameContext.Provider value={contextValue}>
      <Wrapped />
    </FrameContext.Provider>
  );
};

export default FrameContent;
