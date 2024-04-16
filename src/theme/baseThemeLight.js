import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as AppSetup from "../custom/appSetup.js";

let baseThemeLight = createTheme({
  palette: {
    customChipColors: {
      g: AppSetup.greenChipColor,
      y: AppSetup.yellowChipColor,
      r: AppSetup.redChipColor,
      gr: AppSetup.grayChipColor,
    },
    customChipTextColor: {
      g: AppSetup.greenChipTextColor,
      y: AppSetup.yellowChipTextColor,
      r: AppSetup.redChipTextColor,
      gr: AppSetup.grayChipTextColor,
    },
    background: {
      default: AppSetup.globalBackgroundColor,
    },
    color: {
      default: AppSetup.globalTextColor,
    },
    button: {
      main: AppSetup.globalButtonBackgroundColor,
      text: AppSetup.globalButtonTextColor,
      mainHover: AppSetup.globalButtonBackgroundHoverColor,
      textHover: AppSetup.globalButtonTextHoverColor,
    },
    secondary: { main: "#666" },
  },
  typography: {
    // Base typography
  },

  shape: {
    borderRadius: 6,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          width: 54,
          height: 54,
          "@media (max-width: 640px)": {
            width: 46,
            height: 46,
          },
        },
      },
    },
  },
});

baseThemeLight = responsiveFontSizes(baseThemeLight);

export default baseThemeLight;
