import { React, useState, useEffect } from "react";

import Canvas from "../canvas/canvas.component";
import CanvasTooltip from "../canvas-tooltip/canvas.Tooltip.component";

import "./player.styles.scss";
import UiControls from "../ui-controls/ui-controls.components";
import { useContext } from "react";
import { LivestateContext } from "../../context/LivestateContext";

import { useMediaQuery } from "./../../utils/useMediaQuery";

function Player() {
  const [livestate] = useContext(LivestateContext);
  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div id="e3d-player">
      <Canvas />
      <div className="e3d-ui-player-controls">
        <div className="e3d-ui-player-controls__wrapper">
          <UiControls />
          <div>
            {/* <div id="e3d-ui-breadcrumbs"></div> */}
            <div id="e3d-ui-settings"></div>
          </div>
          {/* <div className="e3d-ui-player-controls__bottom-right">
            <div id="e3d-ui-rotate"></div>
            <div id="e3d-ui-zoom"></div>
          </div> */}
          {/* <div id="e3d-ui-master_slave_switch"></div>
          <div id="e3d-ui-sun"></div>
          <div id="e3d-ui-sidebar-button"></div> */}
        </div>
      </div>
      {/* <div id="e3d-ui-footer"></div> */}
      {livestate.tooltipVisible && isBigScreen && <CanvasTooltip />}{" "}
    </div>
  );
}

export default Player;
