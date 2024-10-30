class BarChart{
    /**
     * The canvas on which the chart will be displayed
     */
    #canvas; // # = atribut privat
    /**
     * Creates a new chart instance
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
        this.#canvas = canvas;
    }

    /**
     * Draws the bar chart
     * @param {Array<Number>} values 
     * @param {Onject} options
     */
    draw(values, options){
        const context = this.#canvas.getContext('2d');
        //context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        const barWidth = this.#canvas.width / values.length;

        const maxValue = Math.max(...values);
        const f = this.#canvas.height / maxValue;

        
        context.strokeStyle = 'darkred';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        for(let i = 0; i < values.length; i++){
            const barX = i * barWidth;

            const barHeight = values[i] * f * 0.9;

            const barY = this.#canvas.height - barHeight;

            context.fillStyle = 'orange';
            context.fillRect(
                barX + barWidth / 4, 
                barY, 
                barWidth / 2, 
                barHeight);

            if (options.showOutline)
                context.strokeRect(
                    barX + barWidth / 4, 
                    barY, 
                    barWidth / 2, 
                    barHeight);

            if (options.showLabels){
                context.fillStyle = 'black';
                context.fillText(
                    values[i],
                    barX + barWidth / 2,
                    barY + barHeight / 2
                );
            }
        }
    }
}