import { React, useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import SidebarUnit from "../sidebar-unit/sidebarUnit.component";
import "./sidebarFilter.styles.scss";
import { StateContext } from "../../context/ProjectDataContext";
import { LivestateContext } from "../../context/LivestateContext";
import { Slider, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box } from "@mui/material";

import * as AppSetup from "../../custom/appSetup";

import { useMediaQuery } from "../../utils/useMediaQuery";

function SidebarFilter() {
  const [flaeche, setFlaeche] = useState([0, 100]);
  const [preis, setPreis] = useState([0, 1000000]);
  const [etage, setEtage] = useState([0, 10]);
  const [zimmer, setZimmer] = useState([1, 5]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const handleFlaecheChange = (event, newValue) => {
    setFlaeche(newValue);
  };

  const handlePreisChange = (event, newValue) => {
    setPreis(newValue);
  };

  const handleEtageChange = (event, newValue) => {
    setEtage(newValue);
  };

  const handleZimmerChange = (event, newValue) => {
    setZimmer(newValue);
  };

  const handleOnlyAvailableChange = (event) => {
    setOnlyAvailable(event.target.checked);
  };

  const handleOnlyFavoritesChange = (event) => {
    setOnlyFavorites(event.target.checked);
  };

  return (
    <div>
      <div>
        <h3>Fläche</h3>
        <Slider
          value={flaeche}
          onChange={handleFlaecheChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinArea}
          max={AppSetup.flatsMaxArea}
          valueLabelFormat={(value) => `${value} m2`}
        />
      </div>

      <div>
        <h3>Preis</h3>
        <Slider
          value={preis}
          onChange={handlePreisChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinPrice}
          max={AppSetup.flatsMaxPrice}
          valueLabelFormat={(value) => `CHF ${value}`}
        />
      </div>

      <div>
        <h3>Etage</h3>
        <Slider
          value={etage}
          onChange={handleEtageChange}
          valueLabelDisplay="auto"
          min={AppSetup.flatsMinFloor}
          max={AppSetup.flatsMaxFloor}
        />
      </div>

      <div>
        <h3>Zimmer</h3>
        <Slider
          value={zimmer}
          onChange={handleZimmerChange}
          valueLabelDisplay="auto"
          min={1}
          max={5}
        />
      </div>

      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyAvailable}
                onChange={handleOnlyAvailableChange}
              />
            }
            label="Only Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyFavorites}
                onChange={handleOnlyFavoritesChange}
              />
            }
            label="Only Favorites"
          />
        </FormGroup>
      </div>
    </div>
  );
}
export default SidebarFilter;
