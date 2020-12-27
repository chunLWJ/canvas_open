// var canvas;
// var context;
window.onload = function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d')

    const FONT_HEIGHT = 15,
        MARGIN = 35,
        HAND_TRUNCATION = canvas.width / 25,
        HOUR_HAND_TRUNCATION = canvas.width / 10,
        NUMERAL_SPACING = 20,
        RADIUS = canvas.width / 2 - MARGIN,
        HAND_RADIUS = RADIUS + NUMERAL_SPACING;

    context.font = FONT_HEIGHT + "px Arial"; // 设置字体
    let loop = setInterval(drawClock,1000)

    // 每秒的绘制函数
    function drawClock(){
        context.clearRect(0,0,canvas.width,canvas.height)
        drawCircle()
        drawCenter()
        drawHands()
        drawNumerals()
    }

    // 绘制数字
    function drawNumerals(){
        let numerals = [1,2,3,4,5,6,7,8,9,10,11,12],
            angle = 0,
            numeralWidth = 0;
        console.log(numerals)
        numerals.forEach(value => {
            angle = Math.PI / 6 * (value - 3)
            numeralWidth = context.measureText(value).width
            context.fillText(
                value.toString(),
                canvas.width / 2 + Math.cos(angle) * HAND_RADIUS - numeralWidth / 2,
                canvas.height / 2 + Math.sin(angle) * HAND_RADIUS - FONT_HEIGHT / 3
            )

        })
    }

    // 绘制边框
    function drawCircle(){
        context.beginPath();
        context.arc(canvas.width / 2,canvas.height / 2, RADIUS, 0, Math.PI * 2, true)
        context.stroke()
    }

    // 绘制中心
    function drawCenter(){
        context.beginPath();
        context.arc(canvas.width / 2,canvas.height / 2, 5, 0,Math.PI * 2,true)
        context.stroke()
    }

    // 绘制 时分秒 的指针
    function drawHands(){
        var date = new Date(),
            hour = date.getHours();
        hour = hour > 12 ? hour - 12 : hour

        console.log(hour,date.getMinutes(),date.getMinutes() / 60,date.getMinutes() / 60 * 5)
        console.log(hour * 5 + (date.getMinutes() / 60) * 5)
        // 绘制时钟 1个时钟跨5个点，60分钟占一时
        drawHand(hour * 5 + (date.getMinutes() / 60) * 5,true)
        drawHand(date.getMinutes())
        drawHand(date.getSeconds())
    }

    /**
     * 绘制时钟的三个针
     * @param loc {number}
     * @param isHour {Boolean} 是否时钟，是的话长度再减少 HOUR_HAND_TRUNCATION
     */
    function drawHand(loc,isHour = false){
        let angle = (Math.PI*2) * (loc / 60) - Math.PI/2,
            handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
                : RADIUS - HAND_TRUNCATION;

        context.moveTo(canvas.width / 2,canvas.height / 2)
        context.lineTo(
            canvas.width / 2 + Math.cos(angle) * handRadius,
            canvas.height / 2 + Math.sin(angle) * handRadius
        )
        context.stroke()
    }


}