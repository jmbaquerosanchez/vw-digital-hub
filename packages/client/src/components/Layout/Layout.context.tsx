import { createContext } from "react";
import type { Size } from "@vw-digital-hub/utils";

export type LayoutContextType = {
  size: Size;
};

export const LayoutContext = createContext<LayoutContextType>(
  {} as LayoutContextType
);
