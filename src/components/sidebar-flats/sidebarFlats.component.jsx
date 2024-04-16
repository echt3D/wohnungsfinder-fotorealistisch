import { React, useContext, useEffect } from "react";
import { useTheme } from "@mui/material";
import SidebarUnit from "../sidebar-unit/sidebarUnit.component";
import "./sidebarFlats.styles.scss";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";
import { Box } from "@mui/material";

import { useMediaQuery } from "../../utils/useMediaQuery";

function SidebarFlats() {
  const [state, setState] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);

  const theme = useTheme();

  useEffect(() => {
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const allFlatCards = document.querySelectorAll(
    ".e3d-ui-sidebar_flat-list-item"
  );

  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  let lastHoveredFlatItem = undefined;

  function handleMouseOver(e) {
    allFlatCards.forEach((el) => el.classList.remove("active"));
    const targetCard = e.target.closest(".e3d-ui-sidebar_flat-list-item");
    if (targetCard) {
      const hoveredUnitObj = Object.values(state.units).find(
        (unit) => unit.title === targetCard.dataset.id
      );
      targetCard.classList.add("active");
      if (lastHoveredFlatItem) {
        if (targetCard.dataset.id === lastHoveredFlatItem.dataset.id) {
          setLivestate((prevS) => ({
            ...prevS,
            hoveredUnit: hoveredUnitObj,
            isHovered: true,
          }));
        }
      }
    }
    lastHoveredFlatItem = targetCard;
  }

  const sidebarWidth = state.config.ui.sidebarWidth;

  return (
    <>
      <div
        className="e3d-ui-sidebar__list-wrapper"
        style={{
          height: isBigScreen
            ? `calc(100vh - ${sidebarWidth / 2}px - 49px - 23px)`
            : "auto",
        }}
      >
        <div className="e3d-ui-sidebar__list">
          <div className="e3d-ui-sidebar__list-actions"></div>
          <div
            className="e3d-ui-sidebar__list-group scrollbar--light"
            style={{
              display: !isBigScreen ? "flex" : "",
              flexDirection: !isBigScreen ? "row" : "",
            }}
          >
            {Object.values(state.units).map((unit, i) => {
              const status =
                state.project.settings.statustable[unit.state_simplyfied_en];
              const chipColor =
                theme.palette.customChipColors[status.colorCode];
              return (
                <Box
                  key={i}
                  className={
                    unit.title === livestate.hoveredUnit.title
                      ? "e3d-ui-sidebar_flat-list-item active"
                      : "e3d-ui-sidebar_flat-list-item"
                  }
                  data-id={unit.title}
                  sx={{ mt: 1.5, mr: !isBigScreen ? 1.5 : 0 }}
                  style={{
                    minWidth: !isBigScreen ? "320px" : "",
                    boxShadow: isBigScreen
                      ? ""
                      : `8px 0px 0px 0px ${chipColor} inset`,
                  }}
                >
                  <SidebarUnit
                    props={unit}
                    statustable={state.project.settings.statustable}
                    className="e3d-ui-sidebar_flat_container"
                    hasChip={isBigScreen ? true : false}
                  />
                </Box>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default SidebarFlats;
