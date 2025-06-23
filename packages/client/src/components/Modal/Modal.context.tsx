import { createContext } from "react";
import type { ModalDef, ModalProps } from "./Modal.types";
import type { UseStateSetter } from "@vw-digital-hub/utils";

export type ModalContextType = {
  modal?: ModalDef<ModalProps>;
  setModal: UseStateSetter<ModalDef<ModalProps> | undefined>;
  transitioning: boolean;
  setTransitioning: UseStateSetter<boolean>;
  output?: unknown;
  setOutput: UseStateSetter<unknown>;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);
