// var canvas;
// var context;
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const rubberBand = document.getElementById('rubberBand')
    const resetButton = document.getElementById('resetButton')

    let image = new Image(),
        mousedown = {},
        rubberBandRectangle = {},
        dragging = false;


    image.src = '../../images/curved-road.png'
    image.onload = function () {
        context.drawImage(image,0,0,canvas.width,canvas.height)
    }
    resetButton.onclick = function () {
        context.clearRect(0,0,context.canvas.width,context.canvas.height)
        context.drawImage(image,0,0,canvas.width,canvas.height)
    }
    canvas.onmousedown = function (e) {
        const x = e.clientX,
            y = e.clientY;
        e.preventDefault();
        rubberBandStart(x,y)
    }
    window.onmousemove = function (e) {
        const x = e.clientX,
            y = e.clientY;
        e.preventDefault();
        if (dragging)
            rubberBandStretch(x,y)
    }
    window.onmouseup = function (e) {
        e.preventDefault();
        rubberBandEnd()
    }


    // 松开的时候，重新绘制画布被矩形框选的地方
    function rubberBandEnd(){
        const bbox = canvas.getBoundingClientRect();
        try {
            context.drawImage(
                canvas,
                rubberBandRectangle.left - bbox.left,
                rubberBandRectangle.top - bbox.top,
                rubberBandRectangle.width,
                rubberBandRectangle.height,
                0,
                0,
                canvas.width,
                canvas.height,
            )
        } catch (e) {}

        resetRubberBandRectangle()
        resizeRubberBand()
        hideRubberBand()
        dragging = false
    }

    // 重置矩形大小
    function resetRubberBandRectangle(){
        rubberBandRectangle = {top: 0,left: 0, width: 0, height: 0}
    }

    /**
     * 矩形移动的时候，一直对 矩形对象 赋值新值
     * @param x {number}
     * @param y {number}
     */
    function rubberBandStretch(x,y) {
        rubberBandRectangle.left = x < mousedown.x ? x : mousedown.x
        rubberBandRectangle.top = y < mousedown.y ? y : mousedown.y
        rubberBandRectangle.width = Math.abs(x - mousedown.x)
        rubberBandRectangle.height = Math.abs(y - mousedown.y)

        moveRubberBand();
        resizeRubberBand()
    }

    // 重置矩形大小
    function resizeRubberBand(){
        rubberBand.style.width = rubberBandRectangle.width + 'px'
        rubberBand.style.height = rubberBandRectangle.height + 'px'
    }

    /**
     * 画布按下的时候，定位 和 显示下矩形
     * @param x {number}
     * @param y {number}
     */
    function rubberBandStart(x,y){
        mousedown.x = x;
        mousedown.y = y;
        rubberBandRectangle.left = mousedown.x;
        rubberBandRectangle.top = mousedown.y;

        moveRubberBand() // 移动矩形
        showRubberBand() // 显示
        dragging = true
    }

    // 移动矩形
    function moveRubberBand(){
        rubberBand.style.left = rubberBandRectangle.left + 'px';
        rubberBand.style.top = rubberBandRectangle.top + 'px';
    }
    // 设置可见
    function showRubberBand(){
        rubberBand.style.display = 'inline'
    }
    // 设置不可见
    function hideRubberBand(){
        rubberBand.style.display = 'none'
    }



}