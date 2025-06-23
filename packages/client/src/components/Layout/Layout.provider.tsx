import { type FC, useMemo, useState, useEffect } from "react";
import type { Size, HOCProps } from "@vw-digital-hub/utils";
import { THRESHOLD_LARGE } from "./Layout.constants";
import { LayoutContext, type LayoutContextType } from "./Layout.context";

const getSize = (): Size => {
  return window.innerWidth > THRESHOLD_LARGE ? "large" : "small";
};

export const LayoutProvider: FC<HOCProps> = ({ children }) => {
  const [size, setSize] = useState<Size>(getSize());
  const contextValue: LayoutContextType = useMemo(
    () => ({
      size,
    }),
    [size]
  );

  const onResize = () => {
    setSize(getSize());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <LayoutContext value={contextValue}>{children}</LayoutContext>;
};
