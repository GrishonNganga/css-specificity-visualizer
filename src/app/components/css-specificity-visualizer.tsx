import ResizablePanelGroupWrapper from "./resizable-group-wrapper";
import HtmlContainer from "./html-container";
import CSSContainer from "./css-container";
import JavascriptContainer from "./javascript-container";
import Preview from "./preview";

const CSSSpecificityVisualizer = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <ResizablePanelGroupWrapper
        direction="vertical"
        panels={[
          <ResizablePanelGroupWrapper
            key={"one"}
            direction="horizontal"
            panels={[<HtmlContainer key={"html"}/>, <CSSContainer key={"css"}/>, <JavascriptContainer key="js"/>]}
          />,
          <Preview key={"preview"} />,
        ]}
      />
    </div>
  );
};

export default CSSSpecificityVisualizer;
