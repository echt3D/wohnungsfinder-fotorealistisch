import React, { useState } from "react";
import * as AppSetup from "../custom/appSetup";

const livestate = {
  isHovered: false,
  hoveredUnit: {
    adress: "",
    area: "0",
    custom_1: "",
    custom_2: "",
    custom_3: "",
    custom_4: "",
    custom_5: "",
    custom_6: "",
    document: "",
    dsc: "",
    floor: "",
    id: "",
    name: "name",
    player: "",
    price: "0",
    price_per_sm: "",
    rooms: "",
    se_id: "",
    status: "0",
    tour: "",
    tour_2: "",
    type: "",
    url_1: "",
    url_2: "",
    url_3: "",
  },
  stateIsLoading: true,
  backgroundImgIndex: 4,
  sidebarVisible: true,
  drawMarksAlways: AppSetup.drawMarksAlways,
};

export const LivestateContext = React.createContext();

const Livestate = ({ children }) => {
  const [state, setState] = useState(livestate);
  return (
    <LivestateContext.Provider value={[state, setState]}>
      {children}
    </LivestateContext.Provider>
  );
};

export default Livestate;
