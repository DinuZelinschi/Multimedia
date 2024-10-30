class BarChart {
    /**
     * The canvas on which the chart will be displayed
     */
    #canvas; // # = atribut privat
    /**
     * Creates a new chart instance
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.#canvas = canvas;
    }

    /**
     * Draws the bar chart
     * @param {Array<Number>} values 
     */
    draw(values, options = {}) {
        const context = this.#canvas.getContext('2d');
        const barWidth = this.#canvas.width / values.length;

        const maxValue = Math.max(...values);
        const f = this.#canvas.height / maxValue;

        context.font = '16px Arial'; 

        for (let i = 0; i < values.length; i++) {
            const barX = i * barWidth;
            const barHeight = values[i] * f * 0.9;
            const barY = this.#canvas.height - barHeight;

            context.fillStyle = 'orange';
            context.fillRect(
                barX + barWidth / 4,
                barY,
                barWidth / 2,
                barHeight
            );

            if (options.showOutline) {
                context.strokeStyle = 'darkred';
                context.strokeRect(
                    barX + barWidth / 4,
                    barY,
                    barWidth / 2,
                    barHeight
                );
            }

            context.fillStyle = 'black'; 
            context.fillText(
                values[i].toString(), 
                barX + barWidth / 2 - context.measureText(values[i].toString()).width / 2, 
                this.#canvas.height - 5
            );
        }
    }
}
