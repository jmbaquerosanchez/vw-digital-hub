import { createContext } from "react";
import type { UseStateSetter } from "@vw-digital-hub/utils";

export type SidebarContextType = {
  opened: boolean;
  setOpened: UseStateSetter<boolean>;
};

export const SideBarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
);
