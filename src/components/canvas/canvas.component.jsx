import {
  React,
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react";
import { LivestateContext } from "../../context/LivestateContext";
import { StateContext } from "../../context/ProjectDataContext";

import * as AppSetup from "../../custom/appSetup";

import "./canvas.styles.scss";

import { defaultHoveredUnit } from "./canvasUtils";
import { getColor } from "./canvasUtils";
import { useMediaQuery } from "../../utils/useMediaQuery";

const Canvas = () => {
  const [state] = useContext(StateContext);
  const [livestate, setLivestate] = useContext(LivestateContext);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [actualView, setAcualView] = useState(
    state.project.backgroundImages[livestate.backgroundImgIndex]
  );
  const drawMarksAlways = livestate.drawMarksAlways;

  const BackgroundImages = state.project.backgroundImages;

  let canvas, canvasContainer;

  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const preloadImages = () => {
    const loadedImages = BackgroundImages.map((imageName) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/data/${imageName.replace(
        "f",
        ""
      )}.jpg`;
      return img;
    });
    setPreloadedImages(loadedImages);
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const initializeOrUpdateCanvas = () => {
    canvas = canvasRef.current;
    const flatSidebar = document.querySelector("#e3d-ui-sidebar-tab_panel-0");
    canvas.width = canvasContainerRef.current.offsetWidth;
    canvas.height = canvasContainerRef.current.offsetHeight;
    canvas.style.width = `${canvasContainerRef.current.offsetWidth}px`;
    canvas.style.height = `${canvasContainerRef.current.offsetHeight}px`;

    drawCanvasSVGCombined(actualView);
  };

  function drawCanvasSVGCombined(actualView, e) {
    if (!actualView) return;
    let hovered = false;
    let hoveredUnit = defaultHoveredUnit;
    let isHovered = false;

    canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bounds = { width: 2400, height: 1350 };
    const scale = Math.max(
      canvas.width / bounds.width,
      canvas.height / bounds.height
    );
    const scaledWidth = bounds.width * scale;
    const scaledHeight = bounds.height * scale;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const pathX = centerX - scaledWidth / 2;
    const pathY = centerY - scaledHeight / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(pathX, pathY);
    ctx.scale(scale, scale);

    let svgPathsArr = Object.entries(state.svg[actualView]);
    svgPathsArr.forEach((paths, i) => {
      ctx.save();
      const p = new Path2D(paths[1]);
      let unitStatus = "unknow";
      if (state.units && state.units[i] !== undefined) {
        unitStatus = state.units[i].state_simplyfied_en;
      } else {
        console.warn(
          "Keine Wohnungs-ID zu Pfad gefunden. 'State.svg' und 'state.units' im File ProjectDataContext ablgeichen!"
        );
      }
      const unitId = state.units[i].title;
      const statusColor =
        state.project.settings.statustable[unitStatus].colorCode;

      /**
       * Draws a path with a hover effect.
       *
       * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
       * @param {Path2D} p The path to draw.
       * @param {boolean} drawMarksAlways Whether to draw the path marks even when the path is not hovered over.
       * @param {string} statusColor The color of the path marks.
       */
      function drawPath(ctx, p, drawMarksAlways, statusColor) {
        if (drawMarksAlways) {
          ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
          getColor(statusColor, ctx, "MarkColor");
          ctx.fill(p);
          ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
          getColor(statusColor, ctx, "LineColor");
          ctx.stroke(p);
          ctx.globalAlpha = 1;
        }
      }

      /**
       * Handles the mouse hover event on a path.
       *
       * @param {Event} e The mouse hover event.
       * @param {Path2D} p The path to handle the event for.
       * @param {boolean} drawMarksAlways Whether to draw the path marks even when the path is not hovered over.
       * @param {string} statusColor The color of the path marks.
       */
      function handlePathHover(e, p, drawMarksAlways, statusColor) {
        if (e) {
          const isPointInPath = ctx.isPointInPath(p, e.pageX, e.pageY);
          if (isPointInPath) {
            ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
            getColor(statusColor, ctx, "MarkColor");
            ctx.fill(p);
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
            getColor(statusColor, ctx, "LineColor");
            ctx.stroke(p);
            ctx.globalAlpha = 1;

            const hoveredUnitKey = Object.entries(state.units).find(
              ([key, unit]) => unit === svgPathsArr[0]
            )[0];
            const hoveredUnit = state.units[hoveredUnitKey];

            isHovered = true;
            hovered = true;
          } else if (drawMarksAlways) {
            drawPath(ctx, p, drawMarksAlways, statusColor);
          }
        } else {
          if (unitId === livestate.hoveredUnit.title) {
            ctx.lineWidth = 5;
            ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
            getColor(statusColor, ctx, "LineColor");
            ctx.stroke(p);
            ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
            getColor(statusColor, ctx, "MarkColor");
            ctx.fill(p);
          } else {
            if (drawMarksAlways) {
              drawPath(ctx, p, drawMarksAlways, statusColor);
            } else {
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      if (
        livestate.infobar1Visible &&
        unitId === livestate.infobar1Obj?.title
      ) {
        ctx.lineWidth = 5;
        ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
        getColor(statusColor, ctx, "LineColor");
        ctx.stroke(p);
        ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
        getColor(statusColor, ctx, "MarkColor");
        ctx.fill(p);
      }
      if (
        livestate.infobar2Visible &&
        unitId === livestate.infobar2Obj?.title
      ) {
        ctx.lineWidth = 5;
        ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
        getColor(statusColor, ctx, "LineColor");
        ctx.stroke(p);
        ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
        getColor(statusColor, ctx, "MarkColor");
        ctx.fill(p);
      }

      if (e) {
        const isPointInPath = ctx.isPointInPath(p, e.pageX, e.pageY);
        if (isPointInPath) {
          ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
          getColor(statusColor, ctx, "MarkColor");
          ctx.fill(p);
          ctx.lineWidth = 4;
          ctx.lineCap = "round";
          ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
          getColor(statusColor, ctx, "LineColor");
          ctx.stroke(p);
          ctx.globalAlpha = 1;

          const hoveredUnitKey = Object.keys(state.units).find(
            (unit) => unit === svgPathsArr[i][0]
          );
          hoveredUnit = state.units[hoveredUnitKey];

          isHovered = true;
          hovered = true;
        } else if (drawMarksAlways) {
          ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
          getColor(statusColor, ctx, "MarkColor");
          ctx.fill(p);
          ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
          getColor(statusColor, ctx, "LineColor");
          ctx.stroke(p);
          ctx.globalAlpha = 1;
        }
      } else {
        if (unitId === livestate.hoveredUnit.title) {
          ctx.lineWidth = 5;
          ctx.globalAlpha = AppSetup.hoverPathLineAlpha;
          getColor(statusColor, ctx, "LineColor");
          ctx.stroke(p);
          ctx.globalAlpha = AppSetup.hoverPathFillAlpha;
          getColor(statusColor, ctx, "MarkColor");
          ctx.fill(p);
        } else {
          ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
          if (drawMarksAlways) {
            getColor(statusColor, ctx, "MarkColor");
            ctx.fill(p);
            ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
            getColor(statusColor, ctx, "LineColor");
            ctx.stroke(p);
            ctx.globalAlpha = 1;
          }
        }
        if (drawMarksAlways) {
          getColor(statusColor, ctx, "MarkColor");
          ctx.fill(p);
          ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
          getColor(statusColor, ctx, "LineColor");
          ctx.stroke(p);
          ctx.globalAlpha = 1;
        }
      }
      if (drawMarksAlways) {
        ctx.globalAlpha = AppSetup.notHoverPathFillAlpha;
        getColor(statusColor, ctx, "MarkColor");
        ctx.fill(p);
        ctx.globalAlpha = AppSetup.notHoverPathLineAlpha;
        getColor(statusColor, ctx, "LineColor");
        ctx.stroke(p);
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 1;
      ctx.restore();
      return { hoveredUnit, isHovered };
    });

    if (!e || !hovered) {
      hoveredUnit = defaultHoveredUnit;
      isHovered = false;
    }

    if (isHovered) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "auto";
    }
    ctx.restore();
    return { hoveredUnit: hoveredUnit || defaultHoveredUnit, isHovered };
  }

  const mouseMoveHandlerCanvas = useCallback(
    (e) => {
      e.preventDefault();
      if (livestate.hoveredUnit.title !== "") {
        setLivestate((prevS) => ({
          ...prevS,
          hoveredUnit: defaultHoveredUnit,
        }));
      }

      const isTouchEvent = e.type === "touchmove";
      const eventX = isTouchEvent ? e.touches[0].pageX : e.pageX;
      const eventY = isTouchEvent ? e.touches[0].pageY : e.pageY;

      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const scaleX = canvasRef.current.width / canvasBounds.width;
      const scaleY = canvasRef.current.height / canvasBounds.height;
      const adjustedEventX = (eventX - canvasBounds.left) * scaleX;
      const adjustedEventY = (eventY - canvasBounds.top) * scaleY;

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const { hoveredUnit, isHovered } = drawCanvasSVGCombined(actualView, {
        pageX: adjustedEventX,
        pageY: adjustedEventY,
      });

      setLivestate((prevState) => ({
        ...prevState,
        hoveredUnit,
        isHovered,
        tooltipVisible: hoveredUnit.title !== defaultHoveredUnit.title,
      }));
    },
    [actualView, livestate.hoveredUnit]
  );

  const mouseMoveHandlerSidebar = (e) => {
    canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasSVGCombined(actualView);
  };

  useEffect(() => {
    // console.log(livestate.infobar1Visible);
  }, [livestate.infobar1Visible]);

  const mouseClickHandler = (e) => {
    let clickX, clickY;
    if (e.type === "touchend") {
      if (e.originalEvent?.touches[0] || e.originalEvent?.changedTouches[0]) {
        const touch =
          e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        clickX = touch.pageX;
        clickY = touch.pageY;
      } else {
        return; // If there's no touch object, exit the function early
      }
    } else {
      clickX = e.pageX;
      clickY = e.pageY;
    }

    let { hoveredUnit, isHovered } = drawCanvasSVGCombined(actualView, {
      pageX: clickX,
      pageY: clickY,
    });

    // if touch on flat list element
    if (e.srcElement.closest(".e3d-ui-sidebar_flat-list-item")) {
      const clickedFlatTitle = e.srcElement.closest(
        ".e3d-ui-sidebar_flat-list-item"
      ).dataset.id;
      hoveredUnit = Object.values(state.units).find(
        (unit) => unit.title === clickedFlatTitle
      );
    }
    const isClickOnFavorite = e.target.closest(".e3d-favorite");

    const isClickInfobarOrSidebar =
      e.srcElement.closest(".e3d-ui-sidebar-container") ||
      e.srcElement.closest(".e3d-ui-infobar-container");
    const isClickOnFlatCard = e.srcElement.closest(
      ".e3d-ui-sidebar_flat-list-item > div"
    );

    if (
      isClickInfobarOrSidebar &&
      !isClickOnFlatCard &&
      (livestate.infobar1Visible || livestate.infobar2Visible)
    ) {
      setLivestate((prevS) => ({
        ...prevS,
        infobar1Visible: false,
        infobar2Visible: false,
      }));
    } else {
      if (!isClickOnFavorite && clickX && clickY) {
        if (
          livestate.infobar1Visible !== true &&
          hoveredUnit.title !== defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: true,
            infobar1Obj: hoveredUnit,
            infobar2Visible: false,
          }));
        } else if (
          hoveredUnit !== livestate.infobar1Obj &&
          livestate.infobar2Visible !== true &&
          hoveredUnit.title !== defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: true,
            infobar2Obj: hoveredUnit,
          }));
        } else if (hoveredUnit.title === defaultHoveredUnit.title) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        } else if (
          livestate.infobar1Visible === true &&
          hoveredUnit.title === defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        } else if (
          livestate.infobar2Visible === true &&
          hoveredUnit.title === defaultHoveredUnit.title
        ) {
          setLivestate((prevS) => ({
            ...prevS,
            infobar1Visible: false,
            infobar2Visible: false,
          }));
        }
      }
    }
  };

  useEffect(() => {
    setAcualView(BackgroundImages[livestate.backgroundImgIndex]);
  }, [livestate.backgroundImgIndex, state.project.BackgroundImages]);

  const handleResize = useCallback(() => {
    canvas = canvasRef.current;
    canvasContainer = document.querySelector(".e3d-canvas-container");
    canvas.width = canvasContainerRef.current.offsetWidth;
    canvas.height = canvasContainerRef.current.offsetHeight;
    canvas.style.width = `${canvasContainerRef.current.offsetWidth}px`;
    canvas.style.height = `${canvasContainerRef.current.offsetHeight}px`;

    // drawCanvasBG();
    drawCanvasSVGCombined(actualView);
  });

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (canvasContainerRef.current) {
      const observer = new ResizeObserver(() => handleResize());

      observer.observe(canvasContainerRef.current);

      const errorHandler = (e) => {
        if (
          e.message.includes(
            "ResizeObserver loop completed with undelivered notifications" ||
              "ResizeObserver loop limit exceeded"
          )
        ) {
          const resizeObserverErr = document.getElementById(
            "webpack-dev-server-client-overlay"
          );
          if (resizeObserverErr) {
            resizeObserverErr.style.display = "none";
          }
        }
      };
      window.addEventListener("error", errorHandler);
      return () => {
        window.removeEventListener("error", errorHandler);
        observer.disconnect();
      };
    }
  }, [canvasContainerRef]);

  useEffect(() => {
    drawCanvasSVGCombined(actualView);
  }, [actualView, livestate.drawMarksAlways]);

  useEffect(() => {
    canvas = canvasRef.current;
    const flatSidebar = document.querySelector("#e3d-ui-sidebar-tab_panel-0");
    initializeOrUpdateCanvas();
    canvas.addEventListener("mousemove", mouseMoveHandlerCanvas);
    canvas.addEventListener("touchmove", mouseMoveHandlerCanvas);
    flatSidebar.addEventListener("mousemove", mouseMoveHandlerSidebar);
    flatSidebar.addEventListener("touchmove", mouseMoveHandlerSidebar);

    canvas.addEventListener("click", mouseClickHandler);
    canvas.addEventListener("touchend", mouseClickHandler);
    flatSidebar.addEventListener("click", mouseClickHandler);
    flatSidebar.addEventListener("touchend", mouseClickHandler);

    return () => {
      canvas.removeEventListener("mousemove", mouseMoveHandlerCanvas);
      canvas.removeEventListener("touchmove", mouseMoveHandlerCanvas);
      flatSidebar.removeEventListener("mousemove", mouseMoveHandlerSidebar);
      flatSidebar.removeEventListener("touchmove", mouseMoveHandlerSidebar);
      canvas.removeEventListener("click", mouseClickHandler);
      canvas.removeEventListener("touchend", mouseClickHandler);
      flatSidebar.removeEventListener("click", mouseClickHandler);
      flatSidebar.removeEventListener("touchend", mouseClickHandler);
    };
  }, [actualView, livestate.hoveredUnit, canvasRef]);

  const currentImage = preloadedImages.find((img) =>
    img.src.includes(actualView.replace("f", ""))
  );

  const isBigScreen = useMediaQuery("(min-width: 640px)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <div
      className="e3d-canvas-container"
      style={{
        backgroundImage: currentImage ? `url('${currentImage.src}')` : "none",
        height: isBigScreen ? "100vh" : "100%",
      }}
      ref={canvasContainerRef}
    >
      <canvas ref={canvasRef} className="e3d-canvas" />
    </div>
  );
};

export default Canvas;
