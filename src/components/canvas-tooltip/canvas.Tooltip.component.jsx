import { React, useEffect, useState, useContext } from "react";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";

import "./canvasTooltip.styles.scss";
import SidebarUnit from "../sidebar-unit/sidebarUnit.component";

const CanvasTooltip = () => {
  const [state] = useContext(StateContext);
  const [livestate] = useContext(LivestateContext);

  const [mousePos, setMousePos] = useState({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({
        x: event.pageX,
        y: event.pageY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      id="e3d-ui-tooltip"
      style={{
        position: "absolute",
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
      }}
      data-id={livestate.hoveredUnit.title}
    >
      <SidebarUnit
        props={livestate.hoveredUnit}
        statustable={state.project.settings.statustable}
        className="e3d-ui-sidebar_flat_container"
        hasChip={true}
      />
    </div>
  );
};
export default CanvasTooltip;
