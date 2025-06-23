import { useMemo, useState, type FC } from "react";
import type { HOCProps } from "@vw-digital-hub/utils";
import { SideBarContext, type SidebarContextType } from "./SideBar.context";

export const SideBarProvider: FC<HOCProps> = ({ children }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const contextValue: SidebarContextType = useMemo(
    () => ({
      opened,
      setOpened,
    }),
    [opened, setOpened]
  );

  return <SideBarContext value={contextValue}>{children}</SideBarContext>;
};
