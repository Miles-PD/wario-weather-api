import { useOnDraw } from "./Hooks"
import * as constants from '../constants.js'
import { useEffect } from "react";

// Canvas and game logic for display

const Canvas = ({ width, height }) => {
    

    const setCanvasRef = useOnDraw(onDraw);
    

    function onDraw(ctx) {
        
        /// fill bg with generic color just in case
      

        // draw
        constants.BG_SUNNY.onload = () => {
        ctx.drawImage(constants.BG_SUNNY, constants.BG_SUNNY_X, constants.BG_SUNNY_Y); }

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