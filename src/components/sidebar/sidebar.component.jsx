import React, { useEffect, useState } from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Tooltip, useTheme } from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/Visibility";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";

import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

import { StateContext } from "../../context/ProjectDataContext";

import "./sidebar.styles.scss";
import SidebarFlats from "../sidebar-flats/sidebarFlats.component";

// import Logo from "../../custom/logo.svg";
import { LivestateContext } from "../../context/LivestateContext.js";

import * as AppSetup from "../../custom/appSetup";
// import ContactForm from "../contact-form/contactForm.component";

import { useMediaQuery } from "../../utils/useMediaQuery";
// import { InfoboxButtonElement } from "../infobox-button-element/infoboxButtonElement";

import { getProjectPlans } from "./../../utils/getProjectPlans.js";
// import SidebarFilter from "../sidebar-filter/sidebarFilter.component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`e3d-ui-sidebar-tab_panel-${index}`}
      aria-labelledby={`e3d-ui-sidebar-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function e3dTabProps(index) {
  return {
    id: `e3d-ui-sidebar__tab-${index}`,
    "aria-controls": `e3d-ui-sidebar__tab-${index}`,
  };
}

function Sidebar() {
  const [state] = useContext(StateContext);
  const [livestate] = useContext(LivestateContext);
  const [sidebarWidth, setSidebarWidth] = useState(
    state.config.ui.sidebarWidth
  );
  const [sidebarHeight, setSidebarHeight] = useState("auto");
  const [value, setValue] = React.useState(0);

  const {
    factsheet,
    situation_plan,
    environment_plan,
    basement1_plan,
    basement2_plan,
    basement3_plan,
  } = getProjectPlans("", state);

  const theme = useTheme();

  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (livestate.sidebarVisible === false) {
      setSidebarWidth(0);
      setSidebarHeight("0px");
    } else {
      setSidebarWidth(state.config.ui.sidebarWidth);
      setSidebarHeight("231px");
    }
  }, [livestate.sidebarVisible, state.config.ui.sidebarWidth]);

  return (
    <Box
      className="e3d-ui-sidebar-container"
      style={{
        width: isBigScreen ? sidebarWidth : "100%",
        backgroundColor: theme.palette.background.default,
        height: isBigScreen ? "100vh" : sidebarHeight,
      }}
    >
      {isBigScreen ? (
        <Box className="e3d-ui-sidebar__header">
          <Box className="e3d-ui-sidebar__logo">
            {/* <img src={Logo} alt="Logo Uetliblick Gattikon" /> */}
          </Box>
        </Box>
      ) : (
        ""
      )}

      <Box sx={{ width: isBigScreen ? sidebarWidth : "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: AppSetup.tabHeaderBackgroundColor,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="e3d-ui-sidebar__tab-container"
          >
            <Tab
              label={
                <Tooltip title="Wohnungsübersicht" arrow>
                  <VisibilityRoundedIcon />
                </Tooltip>
              }
              {...e3dTabProps(0)}
            />
            {/* <Tab
              label={
                <>
                  <TuneRoundedIcon />
                </>
              }
              {...e3dTabProps(1)}
            /> */}
            <Tab
              label={
                <Tooltip title="Kontakt" arrow>
                  <MailRoundedIcon />
                </Tooltip>
              }
              {...e3dTabProps(1)}
            />
            {/* <Tab
              label={
                <Tooltip title="Weitere Downloads" arrow>
                  <FolderOpenRoundedIcon />
                </Tooltip>
              }
              {...e3dTabProps(2)}
            /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SidebarFlats />
        </TabPanel>
        {/* <TabPanel value={value} index={1}>
          <SidebarFilter />
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <Box>{/* <ContactForm /> */}</Box>
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
          <InfoboxButtonElement
            name="Umgebungsplan"
            icon={FileDownloadRoundedIcon}
            onClickHandler={null}
            href={environment_plan}
            isBigScreen={isBigScreen}
          />
          <InfoboxButtonElement
            name="Situation 1. UG"
            icon={FileDownloadRoundedIcon}
            onClickHandler={null}
            href={basement1_plan}
            isBigScreen={isBigScreen}
          />
          <InfoboxButtonElement
            name="Situation 2. UG"
            icon={FileDownloadRoundedIcon}
            onClickHandler={null}
            href={basement2_plan}
            isBigScreen={isBigScreen}
          />
        </TabPanel> */}
      </Box>
    </Box>
  );
}

export default Sidebar;
