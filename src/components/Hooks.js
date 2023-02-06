import { useRef } from "react";

export function useOnDraw(onDraw) {

    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);
    

    function setCanvasRef(ref) {

        if (!ref) return;
        canvasRef.current = ref;
        isDrawingRef.current = true;
    }

    if (isDrawingRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (onDraw) onDraw(ctx);
    }


    return setCanvasRef;

}