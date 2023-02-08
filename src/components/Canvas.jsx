
import * as constants from '../constants.js'
import { useEffect, useRef, useState } from "react";

// Canvas and game logic for display

const Canvas = ({ width, height }) => {

    const canvasRef = useRef(null);
    const requestIdRef = useRef(null);

    // background graphic stuff
    const [currentBG, setCurrentBG] = useState('sunny');

    const SCROLL_SPEED = 1; //default speed to scroll backgrounds

    const BG = new Image();
    BG.src = `./images/${currentBG}.png`;
    const BG_WIDTH = 640;
    const BG_HEIGHT = 480;
    const BG_X = 0;
    const BG_Y = 0;

    const background = {    //two bgs, one placed the same width in front of the other
        x1: 0,
        x2: BG_WIDTH,
        y: 0,
        width: BG_WIDTH,
        height: BG_HEIGHT
    }
    
    const handleBackground = (ctx) => {
        if (background.x1 <= -BG_WIDTH + SCROLL_SPEED) background.x1 = BG_WIDTH;  // push bg iteration back to front of next bg at 0,0 if it is completely off screen
            else background.x1 -= SCROLL_SPEED;                                   // adding scroll speed helps accomodate for pixels between both bgs
        if (background.x2 <= -BG_WIDTH + SCROLL_SPEED) background.x2 = BG_WIDTH;
            else background.x2 -= SCROLL_SPEED;

        ctx.drawImage(BG, background.x1, BG_Y, BG_WIDTH, BG_HEIGHT); 
        ctx.drawImage(BG, background.x2, BG_Y, BG_WIDTH, BG_HEIGHT)
    }
    
    

    const drawFrame = () => {

        const ctx = canvasRef.current.getContext('2d');

        /// clear screen each frame
        ctx.clearRect(0,0,constants.CANVAS_WIDTH,constants.CANVAS_HEIGHT);

        // draw
        handleBackground(ctx);

    }

    const tick = () => {
        if (!canvasRef.current) return;
        drawFrame();
        requestAnimationFrame(tick)
    }


    useEffect(() => {

        requestIdRef.current = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(requestIdRef.current)
        };
    }, [])



    return (
        <canvas 
            width={width} 
            height={height}
            style={canvasStyle}
            ref={canvasRef}
             />
    )
}

export default Canvas

const canvasStyle = {
    border: "1px solid black",
    position: "absolute",
}