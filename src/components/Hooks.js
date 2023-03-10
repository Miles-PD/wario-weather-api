import { useRef, useEffect } from "react";
import * as constants from '../constants.js'

export function useOnDraw(onDraw) {

    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);
    
    useEffect(() => {

        if (isDrawingRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {

                 setInterval(() => {
                    
                     onDraw(ctx);
                    
                 }, constants.INTERVAL)
    
            }
        }

    }, [])


    function setCanvasRef(ref) {

        if (!ref) return;
        canvasRef.current = ref;
        isDrawingRef.current = true;
    }




    return setCanvasRef;

}