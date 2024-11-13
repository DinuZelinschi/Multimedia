export class ImageEditor {
    /**
     * @param {HTMLCanvasElement} visibleCanvas
     */
    #visibleCanvas; 
    #visibleCanvasContext;
    #offscreenCanvas;
    #offscreenCanvasContext;

    constructor(visibleCanvas) {
        this.#visibleCanvas = visibleCanvas;
        this.#offscreenCanvas=document.createElement('canvas');
        this.#visibleCanvasContext=this.#visibleCanvas.getContext('2d');
        this.#offscreenCanvasContext = this.#offscreenCanvas.getContext('2d');
    }
    /**
     * Changes the current image
     * @param {HTMLImageElement} img
     */
    changeImage(img){
        // Resize the canvases
        this.#visibleCanvas.width = this.#offscreenCanvas.width=img.naturalWidth;
        this.#visibleCanvas.height = this.#offscreenCanvas.height=img.naturalHeight;

        // Draw the image on the offscreen canvas
        this.#offscreenCanvasContext.drawImage(img, 0, 0);

        this.changeEffect('normal');
    }

    /**
     * Change the effect
     * @param {string} effect
    */   
   changeEffect(effect){
        switch(effect){
            case 'normal':
                this.#normal();
                break;
            case 'greyscale':
                this.#greyscale();
                break;
            case 'threshold': // Adaugă acest caz pentru threshold
                this.#threshold();
                break;
            }
   }

   #normal() {
    // Obține imaginea originală de pe offscreenCanvas
    const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
    
    // Afișează imaginea originală pe visibleCanvas
    this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
    #greyscale(){
        const imageData = this.#offscreenCanvasContext.getImageData(0,0,this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for(let i =0; i<data.length;i+=4){
            data[i]=data[i+1]=data[i+2]=Math.round((data[i]+data[i+1]+data[i+2])/3);
        }
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
    #threshold() {
        const imageData = this.#offscreenCanvasContext.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
    
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Media canalelor R, G, B
            const thresholdValue = avg > 128 ? 255 : 0; // Pragul este 128, orice valoare peste devine alb (255), sub devine negru (0)
            data[i] = data[i + 1] = data[i + 2] = thresholdValue; // Aplică pragul
        }
    
        // Aplică modificările pe visibleCanvas
        this.#visibleCanvasContext.putImageData(imageData, 0, 0);
    }
    
}
