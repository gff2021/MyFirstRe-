// 给window绑定加载完成事件
bindEvent(window, 'load', function () {
    // 获取元素
    var bg = document.getElementById('bgImg');
    var uname = document.getElementById('uname');
    uname.reg = new RegExp(/^[a-z]{3,4}$/);
    var upwd = document.getElementById('upwd');
    upwd.reg = /^[A-z0-9]{6,16}$/;
    var uclass = document.getElementById('uclass');
    uclass.reg = /^[0-9]{1,3}$/;
    iptArr = [uname, upwd, uclass]; // 将三个输入框放进数组
    var loginBtn = document.getElementById('submitBtn');

    // 打开页面先验证输入框
    iptArr.forEach(function (value, index) {
        if (value.reg.test(value.value)) {
            value.parentNode.children[2].style.color = 'green';
            value.parentNode.children[2].innerHTML = '√ 格式正确';
        }
        else {
            switch (index) {
                case 0:
                    value.parentNode.children[2].style.color = 'red';
                    value.parentNode.children[2].innerHTML = '*3位或4位小写英文字母';
                    break;
                case 1:
                    value.parentNode.children[2].style.color = 'red';
                    value.parentNode.children[2].innerHTML = '*6-16位字母数字组合';
                    break;
                case 2:
                    value.parentNode.children[2].style.color = 'red';
                    value.parentNode.children[2].innerHTML = '班级号，2位或3位数字';
                    break;
            }
        }
    });

    // 设置背景尺寸
    bg.style.width = window.innerWidth + 'px';
    bg.style.height = window.innerHeight + 'px';
    bindEvent(window, 'resize', function () {
        bg.style.width = window.innerWidth + 'px';
        bg.style.height = window.innerHeight + 'px';
    });

    // 失去焦点时验证正则表达式
    iptArr.forEach(function (value, index) {
        bindEvent(value, 'keyup', function () {
            if (this.reg.test(this.value)) {
                this.parentNode.children[2].style.color = 'green';
                this.parentNode.children[2].innerHTML = '√ 格式正确';
            }
            else {
                switch (index) {
                    case 0: {
                        this.parentNode.children[2].style.color = 'red';
                        this.parentNode.children[2].innerHTML = '*3位或4位小写英文字母';
                        break;
                    }
                    case 1: {
                        this.parentNode.children[2].style.color = 'red';
                        this.parentNode.children[2].innerHTML = '*6-16位字母数字组合';
                        break;
                    }
                    case 2: {
                        this.parentNode.children[2].style.color = 'red';
                        this.parentNode.children[2].innerHTML = '班级号，2位或3位数字';
                        break;
                    }
                }
            }
        });
    });

    // 登录按钮绑定点击事件
    bindEvent(loginBtn, 'click', function () {
        var postmsg = 'username=' + uname.value + '&userpwd=' + upwd.value + '&userclass=' + uclass.value + '&type=2';
        uname.reg.test(uname.value) && upwd.reg.test(upwd.value) && uclass.reg.test(uclass.value) && getData('post', 'http://www.qhdlink-student.top/student/login.php', true, postmsg, login);
    });
})

function login(arg) {
    if (arg == 'ok') {
        localStorage.setItem('uname', uname.value);
        location.href = '../index.html';
    }
    else {
        alert('输入有错误');
    }
}