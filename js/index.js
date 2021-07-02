bindEvent(window, 'load', function () {
    // 获取元素
    var navLis = document.getElementById('tabList').querySelector('ul').children;
    var sections = document.querySelector('.tab-cons').children;

    // 获取轮播图元素
    var banner = document.getElementById('banner');
    var focus = document.getElementById('focus');
    var circles = document.getElementById('circles');
    var leftArrow = document.getElementById('arrowLeft');
    var rightArrow = document.getElementById('arrowRight');

    // 获取菜谱元素
    var menu = document.querySelector('.menu').children[0];

    // 获取新闻模块元素
    var tbody = document.querySelector('tbody');

    // 获取老师列表元素
    var teacherUl = document.querySelector('.teachers').children[0];

    // 给左侧导航中的li设置索引
    var index;
    for (var i = 0; i < navLis.length; i++) {
        navLis[i].setAttribute('index', i);
        // 绑定鼠标经过事件
        bindEvent(navLis[i], 'mouseenter', function () {
            for (var j = 0; j < navLis.length; j++) {
                navLis[j].classList.remove('li-bgc');
            }
            this.classList.add('li-bgc');
        });
        bindEvent(navLis[i], 'mouseleave', function () {
            for (var j = 0; j < navLis.length; j++) {
                navLis[j].classList.remove('li-bgc');
            }
        });
        bindEvent(navLis[i], 'click', function () {
            for (var j = 0; j < navLis.length; j++) {
                navLis[j].classList.remove('li-shadow');
            }
            this.classList.add('li-shadow');

            // 点击当前li获取其索引
            index = this.getAttribute('index');
            for (var k = 0; k < sections.length; k++) {
                sections[k].style.display = 'none';
            }
            sections[index].style.display = 'block';
        });
    }

    // Ajax获取轮播图数据
    getData('post', 'http://www.qhdlink-student.top/student/banner.php', true, 'username=gff&userpwd=12345678&userclass=67&type=2', fn1);
    // 设置轮播图
    function fn1(arg) {
        var focusjson = eval('(' + arg + ')');
        // 动态添加图片
        for (var k in focusjson) {
            var ulLi = document.createElement('li');
            ulLi.innerHTML = '<img src="http://www.qhdlink-student.top/' + focusjson[k].path_banner + '" alt="">';
            focus.appendChild(ulLi);
        }
        var ulLis = focus.children;

        // 动态添加圆点
        for (var i = 0; i < ulLis.length; i++) {
            var olLi = document.createElement('li');
            i == 0 && (function () {
                olLi.className = 'active';
            })()
            // 给圆点设置自定义属性index
            olLi.setAttribute('index', i);
            circles.appendChild(olLi);
        }

        // 复制第一张图片，添加到focus末尾
        var ulLiClone = ulLis[0].cloneNode(true);
        focus.appendChild(ulLiClone);
        for (var k = 0; k < ulLis.length; k++) {
            ulLis[k].style.width = banner.clientWidth + 'px';
        }
        focus.style.width = ulLis.length * banner.clientWidth + 'px';

        // 自动轮播图片
        var number = 0;
        timer = setInterval(function () {
            rightArrow.click();
        }, 5000);

        // 鼠标经过banner时显示箭头和圆点，离开隐藏
        banner.addEventListener('mouseenter', function () {
            circles.style.display = 'block';
            leftArrow.style.display = 'block';
            rightArrow.style.display = 'block';
            clearInterval(timer);
        }, false);
        banner.addEventListener('mouseleave', function () {
            circles.style.display = '';
            leftArrow.style.display = '';
            rightArrow.style.display = '';
            timer = setInterval(function () {
                rightArrow.click();
            }, 5000);
        }, false);


        // 给左右箭头绑定点击事件
        var index = 0;
        var flag = true; // 节流阀
        rightArrow.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (number == olLis.length) {
                    number = 0;
                    focus.style.left = 0;
                }
                number++;
                move(focus, -(banner.clientWidth * number), function () {
                    flag = true;
                });
                index++;
                if (index == olLis.length) {
                    index = 0;
                }
                for (var j = 0; j < olLis.length; j++) {
                    olLis[j].className = '';
                }
                olLis[index].className = 'active';
            }
        }, false)
        leftArrow.addEventListener('click', function () {
            if (flag) {
                flag = false;
                if (number == 0) {
                    number = olLis.length;
                    focus.style.left = (-banner.clientWidth * number) + 'px';
                }
                number--;
                move(focus, -(banner.clientWidth * number), function () {
                    flag = true;
                });
                index--;
                if (index == -1) {
                    index = olLis.length - 1;
                }
                for (var j = 0; j < olLis.length; j++) {
                    olLis[j].className = '';
                }
                olLis[index].className = 'active';
            }
        });

        // 给圆点绑定点击事件
        var olLis = circles.children;
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].addEventListener('click', function () {
                if (flag) {
                    flag = false;
                    index = this.getAttribute('index');
                    number = index;
                    for (var j = 0; j < olLis.length; j++) {
                        olLis[j].className = '';
                    }
                    this.className = 'active';
                    move(focus, -(banner.clientWidth * index), function () {
                        flag = true;
                    });
                }
            }, false);
        }
    }

    // Ajax获取菜谱数据
    getData('post', 'http://www.qhdlink-student.top/student/coacha.php', true, 'username=gff&userpwd=12345678&userclass=67&type=2', fn2);
    function fn2(arg) {
        var menujson = eval('(' + arg + ')');
        for (k in menujson) {
            var li = document.createElement('li');
            li.innerHTML = '<img src="http://www.qhdlink-student.top/' + menujson[k].path_coach + '" alt=""><h2>' + menujson[k].name_coach + '</h2><span>' + menujson[k].type_coach + '元</span>';
            menu.appendChild(li);
        }
    }

    // Ajax获取新闻数据
    getData('post', 'http://www.qhdlink-student.top/student/newsa.php', true, 'username=gff&userpwd=12345678&userclass=67&type=2', fn3);
    function fn3(arg) {
        var newsjson = eval('(' + arg + ')');
        for (var k in newsjson) {
            var tr = document.createElement('tr');
            tr.innerHTML = '<td>' + newsjson[k].id_news + '</td><td>' + newsjson[k].title_news + '</td><td>' + newsjson[k].time_news + '</td><td><a href="javascript:;">查看详细</a></td>';
            tbody.appendChild(tr);
            var link = tr.children[tr.children.length - 1].children[0];
            bindEvent(link, 'click', function () {
                var newsId = this.parentNode.parentNode.children[0].innerHTML;
                document.cookie = 'news_id=' + newsId;
                location.href = 'html/news_info.html';
            });
        }
    }

    // Ajax获取老师信息
    getData('post', 'http://www.qhdlink-student.top/student/coach.php', true, 'username=gff&userpwd=12345678&userclass=67&type=2', fn4);
    function fn4(data) {
        var jsondata = eval('(' + data + ')');
        for (var k in jsondata) {
            var starstr = '';
            for (var i = 1; i <= jsondata[k].evaluate_coach; i++) {
                starstr += '<span class="iconfont icon-jingdiananli_wujiaoxing_shoucanghou"></span>';
            }
            var li = document.createElement('li');
            li.innerHTML = '<img src="http://www.qhdlink-student.top/' + jsondata[k].path_coach + '" alt=""><h2>老师姓名：' + jsondata[k].name_coach + '</h2><p>入行时间：' + jsondata[k].dage_coach + '</p><p>加入朗科时间：' + jsondata[k].tage_coach + '</p><p>目前职位：' + jsondata[k].honor_coach + '</p><p>以前职位：' + jsondata[k].type_coach + '</p><p>评价星级：' + starstr + '</p>';
            teacherUl.appendChild(li);
        }
    }
});