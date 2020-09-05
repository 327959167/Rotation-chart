window.onload = function() {
    //获取picture的ul列表
    var pic_ul = document.querySelector('.container .picture');
    //获取picture的li节点
    var pic_li = document.querySelectorAll('.container .picture .item');
    //获取point的ul列表
    var point = document.getElementsByClassName('point');
    //获取左右切图按钮
    var btn = document.querySelectorAll('.btn');
    //获取picture的li的宽度
    var wid = pic_li[0].offsetWidth;
    //获取picture的li的个数
    var len = pic_li.length;
    //索引--图片，小圆点
    var index = 1;
    //计时器
    var timer = null;

    init();
    //复制第一张图片插入最后
    //复制最后一张图片插入最前面
    //设置ul的总宽度
    //设置ul的初始位置
    function init() {
        //获取第一张图片
        var first_pic = document.querySelector('.container .picture .item:first-of-type');
        //获取最后一张图片
        var last_pic = document.querySelector('.container .picture .item:last-of-type');
        //复制第一张图片
        var first_copy = first_pic.cloneNode(true);
        //复制最后一张图片
        var last_copy = last_pic.cloneNode(true);
        //first_copy插入到最后一张
        pic_ul.appendChild(first_copy);
        //last_copy插入到第一张
        pic_ul.insertBefore(last_copy, first_pic);
        //获取一个li（为什么要重新获取：上面又添加了2张图片）
        var pic_li = document.querySelectorAll('.container .picture .item');
        //获取li的个数
        var len = pic_li.length;
        //设置pic_ul的总宽度
        pic_ul.style.width = wid * len + 'px';
        pic_ul.style.left = -wid + 'px';
    }

    //清空点的样式
    function clearPoint() {
        for (var i = 0; i < point.length; i++) {
            point[i].className = 'point';
        }
    }

    //将相应的点改为相应状态
    function pointNum() {
        if (index !== 0) {
            point[index - 1].className = 'point active';
        } else {
            point[pic_li.length - 1].className = 'point active';
        }

    }

    //图片的位移
    function show() {
        clearPoint();
        pointNum();
        var left = -wid * index;
        animation(pic_ul, {
            left: left
        })
    }

    //下一张
    function goNext() {
        index++;
        if (index == 6) {
            index = 1;
            //下面这行代码没什么意思，但却可以起到最后下一张时动画不会一下切过四张图
            //我猜原理可能是在他执行时，掩盖了show里面的动画表现。当show显示时它已经要切最后一张了
            pic_ul.style.left = -wid / 4 + 'px';
        }
        show();
    }

    //上一张
    function goPre() {
        index--;
        if (index < 0) {
            index = 4;
            //这句原理同上
            pic_ul.style.left = -wid * len + 'px';
        }
        show();
    }

    //小圆点点击事件
    function pointShow() {
        for (var i = 0; i < point.length; i++) {
            point[i].index = i;
            point[i].onclick = function() {
                index = this.index + 1;
                show();
            }
        }
    }

    //开启计时器
    function star() {
        clearInterval(timer);
        timer = setInterval(function() {
            goNext();
        }, 3000);
    };

    star();

    //结束计时器
    function stop() {
        clearInterval(timer);
    };

    //功能实现
    pointShow();
    document.getElementById('goNext').onclick = function() {
        goNext();
    }
    document.getElementById('goPre').onclick = function() {
        goPre();
    }

    document.querySelector('.container').onmouseenter = function() {
        btn[0].style.display = 'block';
        btn[1].style.display = 'block';
        stop();
    }
    document.querySelector('.container').onmouseleave = function() {
        btn[0].style.display = 'none';
        btn[1].style.display = 'none';
        star();
    }

}