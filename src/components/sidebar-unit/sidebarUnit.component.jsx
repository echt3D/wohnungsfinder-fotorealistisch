import { React } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import CardTitleInformation from "../card-title-information/cardTitleInformation.component";

import { useTheme } from "@mui/material";

import "./sidebarUnit.styles.scss";
import { formatPrice } from "../../utils/formatFunctions";
import { shortenFloorName } from "../../utils/shortenFloorName";

import { useMediaQuery } from "../../utils/useMediaQuery";

function SidebarUnit({ props, statustable, className, styling, hasChip }) {
  let showPrice = "0";
  let status = "";
  if (statustable[props.state_simplyfied_en]) {
    showPrice = statustable[props.state_simplyfied_en].price;
    status = statustable[props.state_simplyfied_en];
  }

  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  const theme = useTheme();
  const chipColor = theme.palette.customChipColors[status.colorCode];
  const chipTextColor = theme.palette.customChipTextColor[status.colorCode];

  return (
    <Card style={{ background: "transparent" }}>
      <CardContent
        sx={{ pb: 0 }}
        style={{ pointerEvents: isBigScreen ? "auto" : "none" }}
      >
        <CardTitleInformation
          props={props}
          chipColor={chipColor}
          chipTextColor={chipTextColor}
          status={status}
          hasChip={hasChip || false}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            textAlign: "right",
            p: 0.25,
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              Fläche
            </Typography>
            {props.area} m²
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              Geschoss
            </Typography>
            {shortenFloorName(props.floor)}
          </Box>
          <Box>
            <Typography
              color="text.secondary"
              sx={{ textTransform: "uppercase", fontSize: "12px" }}
            >
              Preis
            </Typography>
            {showPrice === "1"
              ? formatPrice(props.selling_price, "CHF", true)
              : "--"}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
export default SidebarUnit;
