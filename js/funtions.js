// 解决绑定事件兼容性问题
function bindEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn);
    }
    else if (obj.attachEvent) {
        obj.attachEvent('on' + type, fn);
    }
    else
        obj['on' + type] = fn;
}

// 封装Ajax
function getData(method, url, async, postmsg, fn) {
    // 创建Ajax对象
    var xmlHttp;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 打开网址
    xmlHttp.open(method, url, async);

    // 设置请求头
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // 设置响应
    xmlHttp.onreadystatechange = change;

    // 发送
    if (postmsg) {
        xmlHttp.send(postmsg);
    }
    else {
        xmlHttp.send();
    }

    function change() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log('连接成功！');
            var data = xmlHttp.responseText;
            fn && fn(data);
        }
        else {
            console.log('正在连接...');
        }
    }
}

// 缓动动画封装
function move(obj, target, cback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            cback && cback();
        }
    }, 10);
}