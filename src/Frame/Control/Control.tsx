import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { DropList } from "vienna-ui";
import { standartComponents } from "../../Core";
import { useClickOutside } from "../../Hooks";
import { FrameContext } from "../FrameContent";

import "./style.css";

interface Rect {
  height: number;
  width: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface DataSet {
  ["data-builder-start-line"]: string;
  ["data-builder-start-column"]: string;
  ["data-builder-end-line"]: string;
  ["data-builder-end-column"]: string;
  ["data-builder-type"]: string;
  ["data-builder-index"]: string;
  ["data-builder-slot"]: string;
}

interface Props extends DataSet {
  elemRef: React.RefObject<any>;
}

const overlay =
  document.getElementById("overlay") ?? document.createElement("div");

const rectBase = {
  height: 0,
  width: 0,
  bottom: 0,
  left: Infinity,
  right: 0,
  top: Infinity,
};

const getRect = (element: Element) => {
  const children = Array.from(element?.children ?? []);
  const newRect = { ...rectBase };
  for (const child of children) {
    if (!(child instanceof HTMLElement)) continue;

    const childRect =
      child.style.display === "contents"
        ? getRect(child)
        : child.getBoundingClientRect();
    newRect.left =
      childRect.left <= newRect.left ? childRect.left : newRect.left;
    newRect.right =
      childRect.right >= newRect.right ? childRect.right : newRect.right;
    newRect.top = childRect.top <= newRect.top ? childRect.top : newRect.top;
    newRect.bottom =
      childRect.bottom >= newRect.bottom ? childRect.bottom : newRect.bottom;
  }

  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;
  return newRect;
};

let zIndex = 99999;

export const Control: React.FC<Props> = ({ elemRef, ...dataset }) => {
  const { onChange, onSelect, onRemoveComponent, selected } =
    useContext(FrameContext);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [isAddSubMenuOpen, setIsAddSubMenuOpen] = useState(false);
  const [rect, setRect] = useState({ ...rectBase });

  useLayoutEffect(() => {
    if (elemRef?.current) {
      const newRect = getRect(elemRef?.current);
      setRect(newRect);
    }
  }, [elemRef?.current]);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setShowContextMenu(false);
    setIsAddSubMenuOpen(false);
  });

  const style = useMemo(
    () => ({
      position: "absolute",
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      top: `${rect.top}px`,
      height: `${rect.height}px`,
      zIndex: zIndex--,
    }),
    [rect]
  );

  const removeHandler = useCallback(
    (e) => {
      if (selected?.index !== undefined) {
        onRemoveComponent?.(Number(selected?.index), String(selected?.slot));
      }
    },
    [selected]
  );

  const changeHandler = useCallback(
    (name) => {
      if (selected?.index !== undefined) {
        onChange?.(
          Number(selected?.index),
          String(selected?.type),
          name,
          String(selected?.slot)
        );
      }
    },
    [selected]
  );

  const selectHandler = useCallback((e: React.MouseEvent) => {
    if (dataset?.["data-builder-type"]) {
      onSelect?.(
        Number(dataset?.["data-builder-index"]),
        dataset?.["data-builder-type"],
        String(dataset?.["data-builder-slot"])
      );
    }
    setShowContextMenu(false);
    setIsAddSubMenuOpen(false);
  }, []);

  const contextMenuHandler = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e);

    setContextMenuPos({ x: e.pageX, y: e.pageY });
    setShowContextMenu(true);
  }, []);

  //@ts-ignore
  const isSelected =
    selected?.index == dataset?.["data-builder-index"] &&
    String(selected?.slot) === String(dataset?.["data-builder-slot"]);

  const sc = Object.entries(standartComponents);
  const scd = selected && standartComponents[selected.type];
  const children = Array.isArray(scd?.children)
    ? sc.filter(([name]) => (scd?.children as string[]).includes(name))
    : sc;

  const element = (
    <div
      className={`controls${isSelected ? " selected" : ""}`}
      ref={ref}
      //@ts-ignore
      style={style}
      onClick={selectHandler}
      onContextMenu={contextMenuHandler}
    >
      {showContextMenu && (
        <DropList fixed coords={contextMenuPos}>
          <DropList.Item
            disabled={!scd?.children ?? false}
            onMouseOver={() => setIsAddSubMenuOpen(true)}
            onMouseLeave={() => setIsAddSubMenuOpen(false)}
          >
            Добавить дочерний элемент
            {isAddSubMenuOpen && (
              <DropList fixed align="horizontal" margins={{ x: 0, y: -8 }}>
                {children.map(([name]) => (
                  <DropList.Item key={name} onClick={() => changeHandler(name)}>
                    {name}
                  </DropList.Item>
                ))}
              </DropList>
            )}
          </DropList.Item>
          <DropList.Item onClick={removeHandler}>Удалить элемент</DropList.Item>
        </DropList>
      )}
    </div>
  );

  return ReactDOM.createPortal(element, overlay);
};

export default Control;
