/**
 * PlayerComparisonRadar Component
 * A reusable SVG-based radar chart for comparing two players' attributes.
 */
class PlayerComparisonRadar {
    /**
     * @param {string} containerId - The ID of the container element to render the chart in.
     * @param {Object} options - Configuration options for the chart.
     */
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            width: 400,
            height: 400,
            maxValue: 100,
            levels: 5,
            padding: 60,
            ...options
        };
        this.data = null;
    }

    /**
     * Renders the chart with the provided data.
     * @param {Object} data - The comparison data.
     */
    render(data) {
        if (!data) return;
        this.data = data;
        this.container.innerHTML = '';
        
        const { width, height, padding, maxValue, levels } = this.options;
        const radius = Math.min(width, height) / 2 - padding;
        const centerX = width / 2;
        const centerY = height / 2;
        const angleSlice = (Math.PI * 2) / data.labels.length;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.overflow = "visible";

        // 1. Draw the Background Grid (Levels)
        for (let j = 0; j < levels; j++) {
            const levelRadius = radius * ((j + 1) / levels);
            const levelPath = data.labels.map((_, i) => {
                const x = centerX + levelRadius * Math.cos(angleSlice * i - Math.PI / 2);
                const y = centerY + levelRadius * Math.sin(angleSlice * i - Math.PI / 2);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ') + ' Z';

            const polygon = document.createElementNS("http://www.w3.org/2000/svg", "path");
            polygon.setAttribute("d", levelPath);
            polygon.setAttribute("fill", "none");
            polygon.setAttribute("stroke", "rgba(148, 163, 184, 0.15)"); // var(--text-muted) with opacity
            polygon.setAttribute("stroke-width", "1");
            svg.appendChild(polygon);
        }

        // 2. Draw the Axis Lines
        data.labels.forEach((label, i) => {
            const x = centerX + radius * Math.cos(angleSlice * i - Math.PI / 2);
            const y = centerY + radius * Math.sin(angleSlice * i - Math.PI / 2);

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", centerX);
            line.setAttribute("y1", centerY);
            line.setAttribute("x2", x);
            line.setAttribute("y2", y);
            line.setAttribute("stroke", "rgba(148, 163, 184, 0.1)");
            line.setAttribute("stroke-width", "1");
            svg.appendChild(line);

            // Labels and Values
            const labelRadius = radius + 35;
            const labelX = centerX + labelRadius * Math.cos(angleSlice * i - Math.PI / 2);
            const labelY = centerY + labelRadius * Math.sin(angleSlice * i - Math.PI / 2);
            
            // Stat Name
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", labelX);
            text.setAttribute("y", labelY - 5);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("fill", "var(--text-muted)");
            text.setAttribute("font-size", "10px");
            text.setAttribute("font-weight", "700");
            text.textContent = label.toUpperCase();
            svg.appendChild(text);

            // Stat Value Comparison
            const valA = data.playerA.data[i];
            const valB = data.playerB.data[i];
            
            const valueText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            valueText.setAttribute("x", labelX);
            valueText.setAttribute("y", labelY + 12);
            valueText.setAttribute("text-anchor", "middle");
            valueText.setAttribute("font-size", "12px");
            valueText.setAttribute("font-weight", "900");
            
            const tspanA = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            tspanA.setAttribute("fill", data.playerA.color);
            tspanA.textContent = valA;
            valueText.appendChild(tspanA);
            
            const tspanSep = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            tspanSep.setAttribute("fill", "rgba(255,255,255,0.2)");
            tspanSep.textContent = " : ";
            valueText.appendChild(tspanSep);

            const tspanB = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            tspanB.setAttribute("fill", data.playerB.color);
            tspanB.textContent = valB;
            valueText.appendChild(tspanB);
            
            svg.appendChild(valueText);
        });

        // 3. Draw Player Polygons
        const drawPlayer = (player, color) => {
            const points = player.data.map((val, i) => {
                const r = (val / maxValue) * radius;
                const x = centerX + r * Math.cos(angleSlice * i - Math.PI / 2);
                const y = centerY + r * Math.sin(angleSlice * i - Math.PI / 2);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ') + ' Z';

            const poly = document.createElementNS("http://www.w3.org/2000/svg", "path");
            poly.setAttribute("d", points);
            poly.setAttribute("fill", color);
            poly.setAttribute("fill-opacity", "0.2");
            poly.setAttribute("stroke", color);
            poly.setAttribute("stroke-width", "3");
            poly.setAttribute("stroke-linejoin", "round");
            
            // Add a glow filter reference (optional, but nice)
            poly.style.filter = `drop-shadow(0 0 4px ${color})`;
            
            svg.appendChild(poly);
        };

        // Draw Player B first then A so A is on top (or vice versa depending on priority)
        drawPlayer(data.playerB, data.playerB.color);
        drawPlayer(data.playerA, data.playerA.color);

        this.container.appendChild(svg);
    }
}
