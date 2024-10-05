import React from "react";
// ResizablePanelGroupWrapper.tsx - A wrapper for grouping resizable panels
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  
  interface PanelGroupProps {
    direction: "vertical" | "horizontal";
    panels: React.ReactNode[];
  }
  
  const ResizablePanelGroupWrapper = ({ direction, panels }: PanelGroupProps) => {
    return (
      <ResizablePanelGroup direction={direction}>
        {panels.map((panel, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ResizableHandle />}
            <ResizablePanel>{panel}</ResizablePanel>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    );
  };
  
  export default ResizablePanelGroupWrapper;
  