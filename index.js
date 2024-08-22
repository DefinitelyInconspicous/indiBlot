// Initialize the document dimensions
setDocDimensions(800, 600);

const config = {
    strokeWidth: 2, // Width of each feather line
    numLayers: 63, // Number of layers in the feather
    numLinesPerLayer: 7, // Number of lines per layer
    minBarbLength: 1, // Minimum length of a barb
    maxBarbLength: 0, // Maximum length of a barb
    maxCurveAmount: 9, // Maximum curve amount for barbs
    numTipSegments: 42, // Number of segments for the tip circles
    tipRadius: 20, // Radius of the circles at the tips
    rotationFactor: Math.PI // Maximum rotation angle for each layer
};


function generateFeatherLines() {
    const lines = [];
    const centerX = 400;
    const startY = 100;
    const endY = 500;
    const stalkLength = endY - startY;
    const layerSpacing = stalkLength / config.numLayers;

    for (let layer = 0; layer < config.numLayers; layer++) {
        const layerPositionY = startY + layer * layerSpacing;
        const layerRadius = 20 + (layer / config.numLayers) * 50;
        const rotationAngle = (layer / config.numLayers) * config.rotationFactor;

        for (let i = 0; i < config.numLinesPerLayer; i++) {
            const angle = rotationAngle + (Math.PI / 2) * (i / config.numLinesPerLayer);
            const length = layerRadius * (Math.random() * (config.maxBarbLength - config.minBarbLength) + config.minBarbLength);
            const curveAmount = Math.random() * config.maxCurveAmount;

            const controlX = centerX + (length / 2) * Math.cos(angle) + Math.sin(angle) * curveAmount;
            const controlY = layerPositionY + Math.cos(angle) * curveAmount;
            const endX = centerX + length * Math.cos(angle);
            const endY = layerPositionY;

            const line = [[centerX, layerPositionY], [controlX, controlY], [endX, endY]];
            lines.push(line);

            const mirrorLine = [[centerX, layerPositionY], [controlX, controlY], [centerX - (endX - centerX), endY]];
            lines.push(mirrorLine);
        }
    }

    const nonOverlappingLines = removeOverlappingLines(lines);

    return nonOverlappingLines;
}

function linesOverlap(line1, line2) {
    const [start1, , end1] = line1;
    const [start2, , end2] = line2;
    return (start1[0] === start2[0] && start1[1] === start2[1] && end1[0] === end2[0] && end1[1] === end2[1]);
}

function removeOverlappingLines(lines) {
    const filteredLines = [];

    for (let i = 0; i < lines.length; i++) {
        let overlapFound = false;
        for (let j = 0; j < filteredLines.length; j++) {
            if (linesOverlap(lines[i], filteredLines[j])) {
                overlapFound = true;
                break;
            }
        }
        if (!overlapFound) {
            filteredLines.push(lines[i]);
        }
    }

    return filteredLines;
}

function generateTipCircles(centerX, centerY, radius, numSegments) {
    const lines = [];
    for (let i = 0; i < numSegments; i++) {
        const angle1 = (i / numSegments) * 2 * Math.PI;
        const angle2 = ((i + 1) / numSegments) * 2 * Math.PI;

        const x1 = centerX + radius * Math.cos(angle1);
        const y1 = centerY + radius * Math.sin(angle1);
        const x2 = centerX + radius * Math.cos(angle2);
        const y2 = centerY + radius * Math.sin(angle2);

        lines.push([[centerX, centerY], [x1, y1], [x2, y2]]);
    }
    return lines;
}

function drawFeatherPattern() {
    const featherLines = generateFeatherLines();

    featherLines.forEach(line => {
        drawLines([line], { stroke: 'black', width: config.strokeWidth });
    });

    const centralAxis = [
        [[400, 100], [400, 500]]
    ];
    drawLines(centralAxis, { stroke: 'black', width: 2 });

    const bottomCircle = generateTipCircles(400, 500, config.tipRadius, config.numTipSegments);
    const topCircle = generateTipCircles(400, 100, config.tipRadius, config.numTipSegments);

    bottomCircle.forEach(line => {
        drawLines([line], { stroke: 'black', width: config.strokeWidth });
    });


}

drawFeatherPattern();
