/**
 *
 * getByClass  (clsaaName,obj)  obj可有可无
 * getStyle  (obj,attr)
 * Move  (obj,json，fn ->{width:100,height:200})
 * trim(str) 去掉字符串前后空格
 *client()
 *addmouseWheel()
 * Created by xzk on 2016/12/8.
 */
function getByClass(className, obj) {
    var aEles = [];
    var oTarget = obj ? document.getElementById(obj) : document;
    var all = oTarget.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
        if (className == all[i].className) {
            aEles.push(all[i]);
        }
        ;
    }
    ;
    return aEles;
}
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function Move(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            //取当前值
            var iCur = parseFloat(getComputedStyle(obj, null)[attr]);
            //计算速度
            var speed = 0;
            if (attr == 'opacity') {
                speed = (json[attr] - iCur) * 100 / 8;
            } else {
                speed = (json[attr] - iCur) / 8;
            }
            speed < 0 ? speed = Math.floor(speed) : speed = Math.ceil(speed);
            //检测停止
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == 'opacity') {
                obj.style[attr] = iCur + speed / 100;
            } else {
                obj.style[attr] = iCur + speed + 'px';
            }
        }
        //在循环之外，判断bStop是否应该停止
        if (bStop) {
            if (typeof fn == 'function') {
                fn && fn();
            }
            clearInterval(obj.timer);
        }
    }, 100)
}

//原型链方法，去掉字符串前后空格
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
//去掉字符串前后空格
function trim(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) !== ' ') {
            str = str.substr(i);
            break;
        }
    }
    for (var i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) !== ' ') {
            str = str.substr(0, i);
            break;
        }
    }
    return str;
}
//选取元素getEl
function getEl(name, obj) {
    var obj = obj || document;
    //name # . tag
    //判断参数是哪种类型
    var type = name.substr(0, 1); //取到参数的第一个字符
    var tag = name.substr(1); //取到参数第一个以后的字符
    //判断如果是# id
    if (type == "#") {
        return document.getElementById(tag);
    }
    //判断如果是. class
    if (type == '.') {
        var arr = [];
        var aAllEles = obj.getElementsByTagName('*'); //选取所有元素
        for (var i = 0, len = aAllEles.length; i < len; i++) {
            var aClassName = aAllEles[i].className.split(' '); //用空格分割每个元素的class
            //for(var j= 0;j<aClassName.length;j++){  //循环每个元素的class
            if (aClassName.indexOf(tag) != -1) { //如果在分割的class数组中存在要查找的tag
                arr.push(aAllEles[i]);
            }
        }
        return arr;
    } else { //如传入的是tagName
        return obj.getElementsByTagName(name);
    }
}
//给元素添加class
function addClass(obj, name) {
    //如果obj没有class，则直接添加
    var oClass = obj.className;
    if (!oClass) {
        obj.className = name;
    } else {
        var aClass = oClass.split(' ');
        //如果obj存在class,要判段 是否添加的class是重复的
        if (aClass.indexOf(name) == -1) { //原来的class中没有要添加的class
            //obj.className += ' '+name;
            aClass.push(name);
            oClass = aClass.join(' ');
        } else {
            //原来的class中存在要添加的class
            oClass = aClass.join(' ');
            //obj.className = oClass
        }
        obj.className = oClass;
    }

}
//给元素删除class
function removeClass(obj, name) {

}
//将伪数组转成真正的数组
var toArray = function (s) {
    try {
        return Array.prototype.slice.call(s);
    } catch (e) {
        var arr = [];
        for (var i = 0, len = s.length; i < len; i++) {
            //arr.push(s[i]);
            arr[i] = s[i]; //据说这样比push快
        }
        return arr;
    }
}
//重复字符串
function RepaeatString(str, n) {
    return new Array(n + 1).join(str);
}
//检测屏幕宽度大小
function client() {
    //ie9+   标准模式  怪异模式
}
//绑定鼠标滚轮事件
function addMouseWheel(obj, fnUp, fnDown) {
    obj.onmousewheel = fn;
    obj.addEventListener('DOMMouseScroll', fn, false);
    function fn(ev) {
        var beUp = null;
        if (ev.wheelDelta) {
            // chrome/ie
            beUp = ev.wheelDelta > 0 ? true : false;
        } else {
            // FF
            beUp = ev.detail < 0 ? true : false;
        }
        if (beUp) {
            fnUp && fnUp();
        } else {
            fnDown && fnDown();
        }
    }
}

//ajax method: get|post; url:请求地址; data:传递给后端的数据; dataType:请求回来的数据类型; succ:成功的回调; fail：失败的回调
function ajaxM(json){
    var ajax = new XMLHttpRequest();
    var settings = {
        url:json.url || '',
        data:json.data || {},
        methed:json.methed || 'get',
        dataType:json.dataType || 'json',
        success:json.success || function(){},
        fail:json.fail || function(){}
    }
    //处理data数据的格式
    var arr = [];
    for(var attr in settings.data){
        arr.push(attr +'='+ settings.data[attr]);
    }

    settings.data = arr.join('&');

    //首先将方法转换为小写，因为后端一般为大写，默认是get方法
    switch(settings.methed.toLowerCase()){
        case 'get':
            ajax.open(settings.methed,settings.url+'?'+settings.data);
            ajax.send();
            break;
        case 'post':
            ajax.open(settings.methed,settings.url);
            ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            ajax.send(settings.data);
            break;
        default:
            ajax.open('get',settings.url+'?'+settings.data);
            ajax.send();
            break;
    }

    ajax.onreadystatechange = function(){
        if(ajax.readyState === 4){
            if(ajax.status >= 200 && ajax.status <= 207){
                switch(settings.dataType){
                    //预期返回的数据格式
                    case 'json':
                        settings.success(JSON.parse(ajax.responseText));
                        break;
                    case 'xml':
                        settings.success(ajax.responseXML);
                        break;
                    case 'str':
                        settings.success(ajax.responseText);
                        break;
                }
            }else{
                settings.fail(ajax.status);
            }
        }
    }
}

//设置cookie
function setCookie(key,value,time) {
    if(time){
        var date= new Date();
        date.setDate(date.getDate() + time);
        document.cookie = key + '=' + value + ';expires=' + date;
    } else{
        document.cookie = key + '=' + value;
    }

}

//删除cookie
function removeCookie(key,value) {
    setCookie(key,value,-1);  //设置过期时间比当前时间小即可
}

//jsonp
function jsonp(json){
  //配置默认的参数
  var opt = {
    url:json.url || '',
    data:json.data||{},
    success:json.success || function(){},
    callback:json.callback || 'callback',
    error:json.error || function(){}
  };
  //为了序列化操作的
  var arr = [];
  //每次请求的开关
  var onOff = true;
  //创建一个随机的函数名。
  var fnName = 'xzk'+Math.random();
  fnName = fnName.replace('0.','')+'_'+ (+new Date());

  //请求成功执行的函数
  window[fnName] = function(data){
    opt.success(data);
    onOff = false;//说明本次请求为成功
  };
  //当5秒之后，如果onOff任然为真，说明没有进入回调，即失败
  setTimeout(function(){
    if(onOff){
      opt.error();//失败调用失败的回调函数即可
    }
  },5000);

  //将data这个对象加一个callback=函数名的字段
  opt.data[opt.callback] = fnName;

    /*
     {
     wd:123
     cb:fn1
     }

     */
  //序列化操作2
  for(var attr in opt.data){
    arr.push(attr +'='+ encodeURI(opt.data[attr]));
  }
  //wd=miaov&cb=fn1
  opt.data = arr.join('&');//序列化操作3
//		console.log(opt.url+'?'+'cb=fn1&'+opt.data);
  //创建script
  var oS = document.createElement('script');
  //拼接url给src
  oS.src = opt.url + '?' + opt.data;
//		oS.src = opt.url+'?'+opt.callback+'='+fnName+'&'+opt.data;
  //插入
  document.getElementsByTagName('head')[0].appendChild(oS);
  //删除
  document.getElementsByTagName('head')[0].removeChild(oS);

}