import { useState, useContext, useEffect } from "react";
import "./infobar.styles.scss";
import * as AppSetup from "../../custom/appSetup";

import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";

import CardTitleInformation from "../card-title-information/cartTitleInformation.component";
import { Box, Button, useTheme } from "@mui/material";
import UnitInformationGrid from "../unit-information-grid/unit-information-grid";
import CloseModal from "../close-modal/closeModal.component";

import PanoramaHorizontalRoundedIcon from "@mui/icons-material/PanoramaHorizontalRounded";
import BorderStyleRoundedIcon from "@mui/icons-material/BorderStyleRounded";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { getProjectPlans } from "../../utils/getProjectPlans";

const Infobar = () => {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [sidebarWidth] = useState(state.config.ui.sidebarWidth);
  const statustable = state.project.settings.statustable;

  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  let status1,
    status2 = "";

  const baseThemeLight = useTheme();
  let chipColor1 = "lightgrey",
    chipColor2 = "lightgrey",
    chipTextColor1 = "black",
    chipTextColor2 = "black",
    url1,
    url2;

  if (livestate.infobar1Obj && livestate.infobar1Obj.state_simplyfied_en) {
    if (statustable[livestate.infobar1Obj.state_simplyfied_en]) {
      status1 = statustable[livestate.infobar1Obj.state_simplyfied_en];
      chipColor1 = baseThemeLight.palette.customChipColors[status1.colorCode];
      url1 = livestate.infobar1Obj.url;
      chipTextColor1 =
        baseThemeLight.palette.customChipTextColor[status1.colorCode];
    }
  }

  if (livestate.infobar2Obj && livestate.infobar2Obj.state_simplyfied_en) {
    if (statustable[livestate.infobar2Obj.state_simplyfied_en]) {
      status2 = statustable[livestate.infobar2Obj.state_simplyfied_en];
      chipColor2 = baseThemeLight.palette.customChipColors[status2.colorCode];
      url2 = livestate.infobar2Obj.url;
      chipTextColor2 =
        baseThemeLight.palette.customChipTextColor[status2.colorCode];
    }
  }

  const clickHandlerAussicht = () => {
    if (livestate.infobar1Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: livestate.infobar1Obj.reference_number
          .replaceAll(" ", "_")
          .replaceAll(".", ""),
      }));
    } else if (livestate.infobar2Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: livestate.infobar2Obj.reference_number
          .replaceAll(" ", "_")
          .replaceAll(".", ""),
      }));
    } else {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: false,
      }));
    }
  };

  let tour1, tour2;
  if (livestate.infobar1Obj?.reference_number)
    tour1 = state.tours[livestate.infobar1Obj.reference_number];
  if (livestate.infobar2Obj?.reference_number)
    tour2 = state.tours[livestate.infobar2Obj.reference_number];

  const plans1 = getProjectPlans(livestate.infobar1Obj, state);
  const plans2 = getProjectPlans(livestate.infobar2Obj, state);

  const clickHandlerRundgang = () => {
    if (livestate.infobar1Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: state.tours[livestate.infobar1Obj.reference_number],
      }));
    } else if (livestate.infobar2Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: state.tours[livestate.infobar2Obj.reference_number],
      }));
    } else {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: false,
      }));
    }
  };

  const clickHandlerGrundriss = () => {
    if (livestate.infobar1Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: plans1.factsheet,
      }));
    } else if (livestate.infobar2Visible === true) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: plans2.factsheet,
      }));
    } else {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: false,
      }));
    }
  };

  return (
    <>
      <Box
        id="e3d-ui-infobar-container-1"
        className="e3d-ui-infobar-container"
        style={{
          backgroundColor: baseThemeLight.palette.background.default,
          width: isBigScreen ? sidebarWidth : "70vw",
          minWidth: "320px",
          transform: livestate.infobar1Visible
            ? `translatex(0px)`
            : `translatex(max(70vw , 320px))`,
        }}
      >
        {livestate.infobar1Obj ? (
          <>
            {/* <CloseModal modalToClose="infobar1Visible" /> */}
            <CardTitleInformation
              props={livestate.infobar1Obj}
              chipColor={chipColor1}
              chipTextColor={chipTextColor1}
              status={status1}
              modalToClose="infobar1Visible"
              hasChip={true}
            />
            <UnitInformationGrid props={livestate.infobar1Obj} />
          </>
        ) : (
          ""
        )}
        <Box>
          {tour1 ? (
            <Button
              color="button"
              variant="outlined"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
              onClick={clickHandlerRundgang}
            >
              <TransferWithinAStationIcon /> Rundgang
            </Button>
          ) : (
            ""
          )}
          <Button
            color="button"
            variant="outlined"
            sx={{
              mt: isBigScreen ? 1.25 : 0.75,
              width: "100%",
              backgroundColor: baseThemeLight.palette.button.main,
              color: baseThemeLight.palette.button.text,
              "&:hover": {
                backgroundColor: baseThemeLight.palette.button.mainHover,
                color: baseThemeLight.palette.button.textHover,
              },
            }}
            onClick={clickHandlerAussicht}
          >
            <PanoramaHorizontalRoundedIcon /> Aussicht
          </Button>
          {plans1 ? (
            <Button
              color="button"
              variant="outlined"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
              onClick={clickHandlerGrundriss}
            >
              <BorderStyleRoundedIcon /> Grundriss
            </Button>
          ) : (
            ""
          )}

          {livestate.infobar1Obj &&
          livestate.infobar1Obj.state_simplyfied_en === "free" ? (
            <Button
              color="button"
              variant="outlined"
              component="a"
              href={url1}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
            >
              <DriveFileRenameOutlineRoundedIcon /> zur
              Reser&shy;vations&shy;anfrage
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Box
        id="e3d-ui-infobar-container-2"
        className="e3d-ui-infobar-container"
        style={{
          backgroundColor: baseThemeLight.palette.background.default,
          width: isBigScreen ? sidebarWidth : "70vw",
          minWidth: "320px",
          transform: livestate.infobar2Visible
            ? `translatex(0px)`
            : `translatex(max(70vw , 320px))`,
        }}
      >
        {" "}
        {livestate.infobar2Obj ? (
          <>
            {/* <CloseModal modalToClose="infobar2Visible" /> */}
            <CardTitleInformation
              props={livestate.infobar2Obj}
              chipColor={chipColor2}
              chipTextColor={chipTextColor2}
              status={status2}
              modalToClose="infobar2Visible"
              hasChip={true}
            />
            <UnitInformationGrid props={livestate.infobar2Obj} />
          </>
        ) : (
          ""
        )}
        <Box>
          {tour2 ? (
            <Button
              color="button"
              variant="outlined"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
              onClick={clickHandlerRundgang}
            >
              <TransferWithinAStationIcon /> Rundgang
            </Button>
          ) : (
            ""
          )}
          <Button
            color="button"
            variant="outlined"
            sx={{
              mt: isBigScreen ? 1.25 : 0.75,
              width: "100%",
              backgroundColor: baseThemeLight.palette.button.main,
              color: baseThemeLight.palette.button.text,
              "&:hover": {
                backgroundColor: baseThemeLight.palette.button.mainHover,
                color: baseThemeLight.palette.button.textHover,
              },
            }}
            onClick={clickHandlerAussicht}
          >
            <PanoramaHorizontalRoundedIcon /> Aussicht
          </Button>
          {plans2 ? (
            <Button
              color="button"
              variant="outlined"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
              onClick={clickHandlerGrundriss}
            >
              <BorderStyleRoundedIcon /> Grundriss
            </Button>
          ) : (
            ""
          )}
          {livestate.infobar2Obj &&
          livestate.infobar2Obj.state_simplyfied_en === "free" ? (
            <Button
              color="button"
              variant="outlined"
              component="a"
              href={url2}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: isBigScreen ? 1.25 : 0.75,
                width: "100%",
                backgroundColor: baseThemeLight.palette.button.main,
                color: baseThemeLight.palette.button.text,
                "&:hover": {
                  backgroundColor: baseThemeLight.palette.button.mainHover,
                  color: baseThemeLight.palette.button.textHover,
                },
              }}
            >
              <DriveFileRenameOutlineRoundedIcon /> zur Reserva&shy;tionsanfrage
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default Infobar;
