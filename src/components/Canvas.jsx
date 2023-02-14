import * as constants from '../constants.js'
import { useEffect, useRef } from "react";
import useState from 'react-usestateref';
import Wario from '../Wario.jsx';

// Canvas and game logic for display

const Canvas = ({ width, height, currentBG, currentFG }) => {

    const canvasRef = useRef(null);
    const requestIdRef = useRef(null);

    let framerate = 0 //frames depicting loop cycle for when canvas is drawn to screen
    let currentFrame = 0;  // Wario's current animation frame
    let framesToAnimate = 0; // how many frames to play per animation
    let reactionFrames = 0;


    const [warioAnim, setWarioAnim] = useState('walk')

    // Wario animation frame counts
    const walk_frames = 9;
    const snowwalk_frames = 4;
    const snowreact_frames = 20;



    let SCROLL_SPEED = 1; //default speed to scroll backgrounds

    const BG = new Image();
    BG.src = `./images/${currentBG}.png`;
    const BG_WIDTH = 640;
    const BG_HEIGHT = 480;
    const BG_Y = 0;

    const FG = new Image();
    FG.src = `./images/ground_${currentFG}.png`;
    const FG_WIDTH = 640;
    const FG_HEIGHT = 480;
    const FG_Y = 0;

    const WO = new Image();
    WO.src = `./images/snowstorm.gif`;
    const WO_WIDTH = 640;
    const WO_HEIGHT = 480;
    const WO_X = 0;
    const WO_Y = 0;

    const background = {    //two bgs, one placed the same width in front of the other
        x1: 0,
        x2: BG_WIDTH,
        y: 0,
        width: BG_WIDTH,
        height: BG_HEIGHT
    }

    const foreground = {    
        x1: 0,
        x2: FG_WIDTH,
        y: 0,
        width: FG_WIDTH,
        height: FG_HEIGHT
    }
    
    const handleBackground = (ctx, SCROLL_SPEED) => {

        if (background.x1 <= -BG_WIDTH + SCROLL_SPEED) background.x1 = BG_WIDTH;  // push bg iteration back to front of next bg at 0,0 if it is completely off screen
        else background.x1 -= SCROLL_SPEED;                                   // adding scroll speed helps accomodate for pixels between both bgs
        if (background.x2 <= -BG_WIDTH + SCROLL_SPEED) background.x2 = BG_WIDTH;
        else background.x2 -= SCROLL_SPEED;

        ctx.drawImage(BG, background.x1, BG_Y, BG_WIDTH, BG_HEIGHT); 
        ctx.drawImage(BG, background.x2, BG_Y, BG_WIDTH, BG_HEIGHT)

    }

    const handleForeground = (ctx, SCROLL_SPEED) => {

        if (foreground.x1 <= -FG_WIDTH + SCROLL_SPEED) foreground.x1 = FG_WIDTH;  
        else foreground.x1 -= SCROLL_SPEED;                                   
        if (foreground.x2 <= -FG_WIDTH + SCROLL_SPEED) foreground.x2 = FG_WIDTH;
        else foreground.x2 -= SCROLL_SPEED;

        ctx.drawImage(FG, foreground.x1, FG_Y, FG_WIDTH, FG_HEIGHT); 
        ctx.drawImage(FG, foreground.x2, FG_Y, FG_WIDTH, FG_HEIGHT)
    }
    
    const handleWeatherOverlay = (ctx) => {

        ctx.drawImage(WO, WO_X, WO_Y, WO_WIDTH, WO_HEIGHT); 

    }

    //determine frame count for looping animations
    const determineFrames = () => {

        if (warioAnim === 'walk')
        framesToAnimate = walk_frames;
        else if (warioAnim === 'snowwalk') 
        framesToAnimate = snowwalk_frames
        else if (warioAnim === 'snowreact')
        framesToAnimate = snowreact_frames
        
        return framesToAnimate
    }

    // const determineReaction = () => {
        
    //     if (reactionFrames >= snowreact_frames){
    //         setWarioAnim('snowwalk')
    //         reactionFrames = 0
    //         }
    // }



    

    const drawFrame = () => {

        const ctx = canvasRef.current.getContext('2d');  

        /// clear screen each frame
        ctx.clearRect(0,0,constants.CANVAS_WIDTH,constants.CANVAS_HEIGHT);

        // draw graphics
        handleBackground(ctx, (warioAnim === 'snowreact' ? SCROLL_SPEED * 0 : SCROLL_SPEED)); //pause movement if Wario is reacting
        handleForeground(ctx, (warioAnim === 'snowreact' ? SCROLL_SPEED * 0 : SCROLL_SPEED));


        Wario(ctx, warioAnim, currentFrame, framerate);

        if (currentFrame >= determineFrames(warioAnim)) currentFrame = 0;
        else if (framerate%7 === 0) currentFrame++;

        

        //handleWeatherOverlay(ctx);

    }

    

    const tick = () => {
        if (!canvasRef.current) return;
        drawFrame();
        framerate++;
        requestAnimationFrame(tick)

    }


    useEffect(() => {
 
       requestIdRef.current = requestAnimationFrame(tick)


        return () => {
            cancelAnimationFrame(requestIdRef.current)
            console.log(currentBG, 'canvas')
        };
    }, [currentBG, currentFG])  // place graphics dependecies so it re-renders each new state mutation



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