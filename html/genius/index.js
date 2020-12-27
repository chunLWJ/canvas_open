// var canvas;
// var context;
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d')
    const readout = document.getElementById('readout')
    let spriteSheet = new Image();

    canvas.onmousemove = function (e) {
        const loc = windowToCanvas(canvas, e.clientX, e.clientY); // client 是 相对于 页面的坐标
        drawBackground()
        drawSpriteSheet()
        drawGuidelines(loc.x,loc.y)
        updateReadout(loc.x,loc.y)
    }

    /**
     *
     * @param x {number}
     * @param y {number}
     */
    function updateReadout(x,y){
        readout.innerText = `(${x.toFixed(0)},${y.toFixed(0)})`
    }

    /**
     * 绘制交叉线
     * @param x {number}
     * @param y {number}
     */
    function drawGuidelines(x,y){
        context.strokeStyle = 'rgba(0,0,230,0.8)'
        context.lineWidth = 0.5;
        drawVerticalLine(x)
        drawHorizontalLine(y)
    }

    /**
     * 绘制 x 坐标的 竖线
     * @param x {number}
     */
    function drawVerticalLine(x) {
        context.beginPath()
        context.moveTo(x + 0.5,0)
        context.lineTo(x + 0.5,context.canvas.height)
        context.stroke()
    }

    /**
     * 绘制 y 坐标的 横线
     * @param y {number}
     */
    function drawHorizontalLine(y) {
        context.beginPath()
        context.moveTo(0,y + 0.5)
        context.lineTo(context.canvas.width, y + 0.5)
        context.stroke()
    }

    // 绘制背景
    function drawBackground() {
        const VERTICAL_LEFT_SPACING = 12;
        let i = context.canvas.height;

        context.clearRect(0,0,canvas.width,canvas.height)
        context.strokeStyle = 'lightgray'
        context.lineWidth = 0.5

        while (i > VERTICAL_LEFT_SPACING * 4) {
            context.beginPath()
            context.moveTo(0,1)
            context.lineTo(context.canvas.width,i)
            context.stroke()
            i -= VERTICAL_LEFT_SPACING
        }
    }

    // 绘制图片
    function drawSpriteSheet(){
        context.drawImage(spriteSheet,0,0)
    }
    spriteSheet.src = '../../images/running-sprite-sheet.png'
    spriteSheet.onload = function () {
        drawSpriteSheet()
    }


    /**
     * 获取相对于画布所在的坐标
     * @param canvas {HTMLCanvasElement}
     * @param x {number}
     * @param y {number}
     * @returns {{x: number, y: number}}
     */
    function windowToCanvas(canvas,x,y) {
        var bbox = canvas.getBoundingClientRect() // 画布相对于窗口的坐标，x,y,left,top,right,bottom,width,height
        return {
            x : x - bbox.left * (canvas.width / bbox.width),
            y : y - bbox.top * (canvas.height / bbox.height),
        }
    }

}