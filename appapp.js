
//      pixi one:                    //////////////////////////////////////

function jugador(){
    let anchoPersonaje = 64;
    let altoPersonaje = 64;
    let posx = (renderer.width/2)-(anchoPersonaje/2); // сдвиг квадрата от центра холста
    let posy = (renderer.height-altoPersonaje)-20;
    let rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, anchoPersonaje, altoPersonaje);
    rectangle.endFill();
    rectangle.x = posx;
    rectangle.y = posy;
    rectangle.vx = 0;
    rectangle.vy = 0;
    return rectangle;
}

let consecutivoEnemigos=0; //for increment
function boots(){ // отображение случайного кубика
    consecutivoEnemigos++; //increment
    let anchoPersonaje = 64;
    let altoPersonaje = 64;
    let posx = randomInt(0, renderer.width - anchoPersonaje);
    enemigos[consecutivoEnemigos] = new Graphics();
    enemigos[consecutivoEnemigos].lineStyle(4, 0xffffff, 1);    //(4, 0xFF3300, 1);
    enemigos[consecutivoEnemigos].beginFill(0xfff); 
    enemigos[consecutivoEnemigos].drawRect(0, 0, anchoPersonaje, altoPersonaje);
    enemigos[consecutivoEnemigos].endFill();
    enemigos[consecutivoEnemigos].x = posx;
    enemigos[consecutivoEnemigos].vy = 0;
    enemigos[consecutivoEnemigos].interactive = true;
    enemigos[consecutivoEnemigos].alpha = 1;
    return enemigos[consecutivoEnemigos];
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hitTestRectangle(r1, r2) { // отображение случайного кубика с определенным расстоянием половины кубика
    let hit, conbinedHalfWidths, conbinedHalfHeights, vx,vy;
    hit = false;
    // Find the center points of each sprite:
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
    // Find the half-widths and half-heights of each sprite:
    r1.halfWidth = r1.width /2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
    conbinedHalfWidths = r1.halfWidth + r2.halfWidth;
    conbinedHalfHeights = r1.halfHeight + r2.halfHeight;
    if ( Math.abs(vx) < conbinedHalfWidths ) {
        if ( Math.abs(vy) < conbinedHalfHeights ) {
            hit = true;
        } else {
            hit = false;
        }
    } else {
        hit = false;
    }
    return hit;
};

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if (event.key === key.value) {
            if(key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };
    key.upHandler = event => {
        if (event.key === key.value) {
            if(key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    let downListener = key.downHandler.bind(key);
    let upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    }
    return key;
}
