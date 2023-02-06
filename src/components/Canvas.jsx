import { useOnDraw } from "./Hooks"
import * as constants from '../constants.jsx'

// Canvas and game logic for display

const Canvas = ({ width, height }) => {

    const setCanvasRef = useOnDraw(onDraw);
    

    function onDraw(ctx) {
        
        /// fill bg with generic color just in case
        ctx.fillStyle = "#abfcff";
        ctx.fillRect(0,0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT);

        // draw
        //ctx.drawImage(constants.BG_SUNNY, constants.BG_SUNNY_X, constants.BG_SUNNY_Y, constants.BG_SUNNY_WIDTH, constants.BG_SUNNY_HEIGHT);

    }

    return (
        <canvas 
            width={width} 
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
             />
    )
}

export default Canvas

const canvasStyle = {
    border: "1px solid black",
    position: "absolute",
}