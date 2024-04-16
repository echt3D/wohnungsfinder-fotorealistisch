export const mode = "production"; // test, production

export const ansprechperson = {
  name: "Ramona Schiesser",
  function: "Leiterin Immobilienverkauf",
  email: "verkauf@lerchpromotionen.ch",
  tel: "+41 55 610 47 46",
};

export const drawMarksAlways = false;

export const dataPathTest = "./dataJSON/uetliblick.api.melon.sale.json";
export const dataPathProd =
  "https://uetliblick.api.melon.sale/api/v1/objects/?format=json";
export const dataPath = mode === "production" ? dataPathProd : dataPathTest;

// Global Colors
export const tabHeaderBackgroundColor = "#ffffff";
export const globalBackgroundColor = "#fcfcfc";
export const globalButtonBackgroundColor = "#000000";
export const globalButtonTextColor = "#ffffff";
export const globalButtonBackgroundHoverColor = "#ffffff";
export const globalButtonTextHoverColor = "#000000";
export const globalTextColor = "#000000";

// Hover Colors and Alphas
export const greenLineColor = "#00FF00";
export const yellowLineColor = "#FFFF00";
export const redLineColor = "#FF0000";
export const grayLineColor = "#CCCCCC";

export const greenMarkColor = "#39BF5B";
export const yellowMarkColor = "#F0DE2D";
export const redMarkColor = "#CA393D";
export const grayMarkColor = "#969696";

export const notHoverPathLineAlpha = 1;
export const notHoverPathFillAlpha = 0.1;
export const hoverPathLineAlpha = 1;
export const hoverPathFillAlpha = 0.3;

// Chip Colors
export const greenChipColor = "#39BF5B";
export const yellowChipColor = "#F0DE2D";
export const redChipColor = "#CA393D";
export const grayChipColor = "#969696";

export const greenChipTextColor = "white";
export const yellowChipTextColor = "black";
export const redChipTextColor = "white";
export const grayChipTextColor = "white";

export const flatsRooms = [];
export const flatsMinArea = 85.4;
export const flatsMaxArea = 131.6;
export const flatsMinPrice = 1631000;
export const flatsMaxPrice = 1921000;
export const flatsMinFloor = 0;
export const flatsMaxFloor = 4;

function getMinMax(url) {
  fetch(url, {
    headers: {
      Accept: "application/json", // Set the Accept header to indicate JSON response
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Initialize variables to store the minimum and maximum values
      let rooms = [];
      let minArea = Number.POSITIVE_INFINITY;
      let maxArea = Number.NEGATIVE_INFINITY;
      let minPrice = Number.POSITIVE_INFINITY;
      let maxPrice = Number.NEGATIVE_INFINITY;
      let minFloor = Number.POSITIVE_INFINITY;
      let maxFloor = Number.NEGATIVE_INFINITY;

      // Iterate over each object in the JSON array
      for (let i = 0; i < data.length; i++) {
        const object = data[i];

        if (!rooms.includes(object.rooms)) {
          rooms.push(object.rooms);
        }
        // Check for minimum and maximum values for "area"
        if (object.area < minArea) {
          minArea = object.area;
        }
        if (object.area > maxArea) {
          maxArea = object.area;
        }

        // Check for minimum and maximum values for "selling_price"
        if (object.selling_price < minPrice) {
          minPrice = object.selling_price;
        }
        if (object.selling_price > maxPrice) {
          maxPrice = object.selling_price;
        }

        // Check for minimum and maximum values for "floor_num"
        console.log(object.floor_num);
        if (object.floor_num < minFloor) {
          minPrice = object.floor_num;
        }
        if (object.floor_num > maxFloor) {
          maxPrice = object.floor_num;
        }
      }

      // Output the minimum and maximum values
      console.log("Minimum and maximum values:");
      console.log("Rooms - Min:", rooms);
      console.log("Area - Min:", minArea, "Max:", maxArea);
      console.log("Selling Price - Min:", minPrice, "Max:", maxPrice);
      console.log("Floor - Min:", minFloor, "Max:", maxFloor);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
}

// getMinMax(dataPath);
