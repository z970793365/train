// 弹幕定时器
var timers = [];
// 控制弹幕显隐变量
var isShow = true;
// 监听发送按钮
$(".send").on("click", function () {
    // 创建弹幕
    var jqueryDom = createScreenbullet($("#screenBulletText").val());
    // 添加定时任务
    addInterval(jqueryDom);
});
// 监听关闭弹幕按钮
$(".clear").on("click", function () {
    if (isShow) {
        $(".bullet").css("opacity", 0);
        isShow = false;
    } else {
        $(".bullet").css("opacity", 1);
        isShow = true;
    }   
});
// 新建一个弹幕
function createScreenbullet(text) {
    var jqueryDom = $("<div class='bullet'>" + text + "</div>");
    var fontColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random()) + ")";
    var fontSize = Math.floor((Math.random()* 20) + 15) + "px";
    var right = $(".screen_container").width() + "px";
    var top = Math.floor(Math.random() * 400) + "px";
    top = parseInt(top) > 352 ? "352px" : top;
    jqueryDom.css({
        "position": 'absolute',
        "color": fontColor,
        "font-size": fontSize,
        "right": right,
        "top": top,
        "whiteSpace": 'nowrap',
        "display": 'block',
    });
    $(".screen_container").append(jqueryDom);
    return jqueryDom;
}
// 为弹幕添加定时任务
function addInterval(jqueryDom) {
    var i = 0;
    var speed = Math.floor(Math.random() * 6) + 1; 
    var right = jqueryDom.offset().right - $(".screen_container").offset().right;
    var timer = setInterval(function () {
        right--;
        jqueryDom.css("right", (i += speed)+ "px");
        if (jqueryDom.offset().right + jqueryDom.width() < $(".screen_container").offset().right) {
            jqueryDom.remove();
            clearInterval(timer);
        }
    }, 10);
    timers.push(timer);
}