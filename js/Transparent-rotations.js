window.onload = function() {
    //获取图片元素
    var pictures = document.getElementsByClassName('item');
    //获取小圆点元素
    var points = document.getElementsByClassName('point');
    //获取左右按钮元素
    var btnleft = document.getElementById('goPre');
    var btnright = document.getElementById('goNext');
    //获取两个button元素
    var btn = document.getElementsByTagName('button');
    //获取整个div元素
    var div = document.querySelector('.wrap');
    //计时器
    var timer = null;
    //元素索引
    var index = 0;

    //清除所有元素的样式
    function clearAll() {
        //pictures
        for (var i = 0; i < pictures.length; i++) {
            pictures[i].className = 'item';
        }
        //points
        for (var i = 0; i < points.length; i++) {
            points[i].className = 'point';
        }
    }

    //相应的索引元素改变样式
    function show() {
        clearAll();
        //points
        points[index].className = 'point active';
        //pictures
        for (var i = 0; i < pictures.length; i++) {
            animation(pictures[i], {
                opacity: 0
            });
            animation(pictures[index], {
                opacity: 100
            });
        }
    }

    //下一张按钮
    function goNext() {
        if (index == pictures.length - 1) {
            index = 0;
        } else {
            index++;
        }
        show();
    }
    //上一张按钮
    function goPre() {
        if (index == 0) {
            index = pictures.length;
        } {
            index--;
        }
        show();
    }

    //功能实现
    //下一张按钮
    btnright.onclick = function() {
            goNext();
        }
        //上一张按钮
    btnleft.onclick = function() {
            goPre();
        }
        //小圆点
    for (var i = 0; i < points.length; i++) {
        points[i].index = i;
        points[i].onclick = function() {
            index = this.index;
            show();
        }
    }
    star();

    //轮播开始
    function star() {
        timer = setInterval(goNext, 3000);
    }
    //轮播停止
    function stop() {
        clearInterval(timer);
    }

    //左右按钮的显隐
    function btn_display(result) {
        for (var i = 0; i < btn.length; i++) {
            btn[i].style.display = result;
        }
    }

    //鼠标移入开始计时器，按钮显示
    div.onmouseenter = function() {
        btn_display('block');
        stop();
    }

    //鼠标移出清除计时器，按钮隐藏
    div.onmouseleave = function() {
        btn_display('none');
        star();
    }
}