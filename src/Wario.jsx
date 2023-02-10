
export default function Wario(ctx, warioAnim, currentFrame) {



    const warioSprite = new Image();
    warioSprite.src = `./images/wario_${warioAnim}.png`

    const posx = 300;
    const posy = 315;
    const sheet_width = 32;
    const sheet_height = 40;
    const sprite_width = sheet_width * 1.5;
    const sprite_height = sheet_height * 1.5;

    ctx.drawImage(warioSprite, currentFrame * sheet_width, 0, sheet_width, sheet_height, posx, posy, sprite_width * 1.5, sprite_height * 1.5);


    
}
