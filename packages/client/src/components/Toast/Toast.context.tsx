import { createContext } from "react";
import type { ToastVariant } from "./Toast.types";
import type { UseStateSetter } from "@vw-digital-hub/utils";

export type ToastContextType = {
  variant: ToastVariant;
  setVariant: UseStateSetter<ToastVariant>;
  message: string | undefined;
  setMessage: (msg: string) => void;
};

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);
