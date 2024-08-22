const config = {
  docWidth: 1021,
  docHeight: 1046,
  gridSize: 78,            // Number of grid cells along one axis
  cellSize: 3,            // Size of each grid cell
  lineWidth: 10,            // Width of each line
  lineColor: 'black'       // Color of the lines
};

setDocDimensions(config.docWidth, config.docHeight);


function drawPolyline(polyline) {
  drawLines([polyline], { stroke: config.lineColor, width: config.lineWidth });
}

// Create a grid of polylines (complex)
for (let x = 0; x < config.gridSize; x++) {
  for (let y = 0; y < config.gridSize; y++) {
    const startX = x * config.cellSize;
    const startY = y * config.cellSize;
    const endX = startX + config.cellSize;
    const endY = startY + config.cellSize;

    // Define polylines for each cell
    const horizontalLine = [[startX, startY], [endX, startY]];
    const verticalLine = [[startX, startY], [startX, endY]];

    
    drawPolyline(horizontalLine);
    drawPolyline(verticalLine);  
  }
}

