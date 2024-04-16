import { React, useContext, useEffect } from "react";
import "./App.scss";
import Player from "./components/player/player.component";
import Sidebar from "./components/sidebar/sidebar.component";
import Infobar from "./components/infobar/infobar.component";
import { StateContext } from "./context/ProjectDataContext";
import Lightbox from "./components/lightbox/lighbox.component";
import { LivestateContext } from "./context/LivestateContext";
import { Box } from "@mui/material";

function E3DApp() {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const lightbox = livestate.lightbox;

  // useEffect(() => {console.log(livestate.lightbox) }, [livestate.lightbox])

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      setLivestate((prevS) => ({
        ...prevS,
        lightbox: false,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // if (lightbox) console.log(lightbox.find("https://"));
  let lightboxSrc, lightboxTitle;
  if (lightbox) {
    if (lightbox.toString().startsWith("http")) {
      if (lightbox.toString().includes("/api/")) {
        lightboxSrc = lightbox;
        lightboxTitle = "Factsheet";
      } else {
        lightboxSrc = lightbox;
        lightboxTitle = "Rundgang";
      }
    } else {
      lightboxSrc = `${process.env.PUBLIC_URL}/data/views/tour.html?start_scene=${lightbox}`;
      lightboxTitle = "Aussicht";
    }
  }

  // console.log(lightbox)

  const infoBoxStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  window.addEventListener("load", (event) =>
    setTimeout(() => {
      document.querySelector("body").classList.remove("preload");
    }, 1500)
  );

  if (state.stateIsLoading === false) {
    return (
      <>
        <div className="e3d-app">
          <Sidebar />
          <Player />
        </div>
        {/* <div id="e3d-ui-footer">Impressum</div> */}
        <Infobar></Infobar>
        {/* <div id="e3d-ui-contactbox"></div> */}
        {/* <div id="e3d-ui-notifications"></div> */}
        {/* <div id="e3d-ui-cookie-banner"></div> */}
        {lightbox ? <Lightbox src={lightboxSrc} title={lightboxTitle} /> : ""}
      </>
    );
  } else {
    if (state.stateIsLoading === "error") {
      return (
        <Box sx={infoBoxStyle}>
          <Box>
            Probleme mit externer Resource.
            <br />
            Bitte später versuchen.
          </Box>
        </Box>
      );
    } else {
      return (
        <Box sx={infoBoxStyle}>
          <Box>Rundgang wird geladen...</Box>
        </Box>
      );
    }
  }
}

export default E3DApp;
