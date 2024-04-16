export function shortenFloorName(floorname) {
  if (!floorname) return;
  if (floorname.indexOf("geschoss") !== -1) {
    return floorname.replace("geschoss", "gesch.");
  }
}
