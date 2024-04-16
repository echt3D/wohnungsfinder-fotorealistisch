import { React, useTheme } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BalconyRoundedIcon from "@mui/icons-material/BalconyRounded";
import AspectRatioRoundedIcon from "@mui/icons-material/AspectRatioRounded";
import LineWeightRoundedIcon from "@mui/icons-material/LineWeightRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";

import { useMediaQuery } from "../../utils/useMediaQuery";

import "./unitInformationGrid.styles.scss";
// import clientTheme from "../../theme/clientTheme";
import baseThemeLight from "../../theme/baseThemeLight";

import { formatPrice } from "../../utils/formatFunctions";
import checkBalconyTerrace from "../../utils/checkBalconyTerrace";

const UnitInformationGrid = ({ props }) => {
  const isBigScreen = useMediaQuery("(min-width:640px)");
  const isLandscape = useMediaQuery("(orientation:landscape)");

  const { exportName, exportArea } = checkBalconyTerrace(
    props.garden_sitting_place_area,
    props.terrace_area,
    props.loggia_area
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mt: isBigScreen ? 1.5 : 0.75 }}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Fläche
        </Typography>
        <Typography variant="h5">{props.area} m²</Typography>
      </Box>
      <Box sx={{ mt: isBigScreen ? 1.5 : 0.75 }}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Geschoss
        </Typography>
        <Typography variant="h5">{props.floor}</Typography>
      </Box>
      <Box sx={{ mt: isBigScreen ? 1.5 : 0.75 }}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          {exportName}
        </Typography>
        <Typography variant="h5">{exportArea} m²</Typography>
      </Box>
      <Box sx={{ mt: isBigScreen ? 1.5 : 0.75 }}>
        <Typography
          color="text.secondary"
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Preis
        </Typography>
        <Typography variant="h5">
          {formatPrice(props.selling_price, "CHF", true)}
        </Typography>
      </Box>
    </Box>
  );
};

export default UnitInformationGrid;
