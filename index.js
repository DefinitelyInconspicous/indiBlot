// Initialize the document dimensions
setDocDimensions(800, 600);

const config = {
    strokeWidth: 2 // Width of each feather line
};

// Function to generate feather lines along the entire stalk
function generateFeatherLines(numLayers, numLinesPerLayer) {
    const lines = [];
    const centerX = 400; // Center of the feather (spine)
    const startY = 100;  // Starting point of the stalk
    const endY = 500;    // Ending point of the stalk
    const stalkLength = endY - startY;
    const layerSpacing = stalkLength / numLayers; // Space between layers

    for (let layer = 0; layer < numLayers; layer++) {
        const layerPositionY = startY + layer * layerSpacing; // Position along the stalk
        const layerRadius = 20 + (layer / numLayers) * 50; // Adjusted radius for barbs

        for (let i = 0; i < numLinesPerLayer; i++) {
            const angle = Math.PI / 4 * (i / numLinesPerLayer); // Spread barbs around the stalk
            const length = layerRadius * (Math.random() * 0.5 + 0.5); // Random length within the layer's radius
            const curveAmount = 10; // Amount of curve for the barbs

          
            const controlX = centerX + (length / 2) * Math.cos(angle) + Math.sin(angle) * curveAmount;
            const controlY = layerPositionY + Math.cos(angle) * curveAmount;
            const endX = centerX + length * Math.cos(angle);
            const endY = layerPositionY;

         
            let line = [[centerX, layerPositionY], [controlX, controlY], [endX, endY]];

         
            const randomBarbAngle = Math.random() * 180 - 90; // Random angle between -90 and 90 degrees
            line = bt.rotate([line], randomBarbAngle, [centerX, layerPositionY])[0];
            lines.push(line);

           
            let mirrorLine = [[centerX, layerPositionY], [controlX, controlY], [centerX - (endX - centerX), endY]];
            mirrorLine = bt.rotate([mirrorLine], randomBarbAngle, [centerX, layerPositionY])[0];
            lines.push(mirrorLine);
        }
    }

    return lines;
}


function applyRandomRotation(lines, centerX, centerY) {
    const randomAngle = Math.random() * 360; // Random angle in degrees
    return bt.rotate(lines, randomAngle, [centerX, centerY]);
}


function drawFeatherPattern() {
    const featherLines = generateFeatherLines(30, 20); // Increase the number of layers and lines per layer
    const centerX = 400;
    const centerY = 300;

    
    const rotatedFeatherLines = applyRandomRotation(featherLines, centerX, centerY);

    
    rotatedFeatherLines.forEach(line => {
        drawLines([line], { stroke: 'black', width: config.strokeWidth });
    });

    
    const centralAxis = applyRandomRotation(
        [[[centerX, 100], [centerX, 500]]], centerX, centerY
    );
    drawLines(centralAxis, { stroke: 'black', width: 2 });
}


drawFeatherPattern();
