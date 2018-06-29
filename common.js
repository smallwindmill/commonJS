// 地址栏通过url获取参数值
1，设置或获取对象指定的文件名或路径。

alert(window.location.pathname)
2，设置或获取整个 URL 为字符串。

alert(window.location.href);

3，设置或获取与 URL 关联的端口号码。

alert(window.location.port)

4，设置或获取 URL 的协议部分。

alert(window.location.protocol)

5，设置或获取 href 属性中在井号“#”后面的分段。

alert(window.location.hash)

6，设置或获取 location 或 URL 的 hostname 和 port 号码。

alert(window.location.host)

7，设置或获取 href 属性中跟在问号后面的部分。

alert(window.location.search)

8，获取变量的值(截取等号后面的部分)

 var url = window.location.search;

//    alert(url.length);

//    alert(url.lastIndexOf('='));

var loc = url.substring(url.lastIndexOf('=')+1, url.length);

9，用来得到当前网页的域名

var domain = document.domain;

stay hungry stay foolish！

function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return unescape(r[2]); return null;
    }
    var classId=GetQueryString('classId');

// 通过对Date原型链创建属性，将Date转化为统一的格式
  Date.prototype.format = function(fmt) {
     var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
        return fmt;
    }

    var curr_Date=new Date().format('yyyy-MM-dd');


    // 提示框
    function tips(msg){
        var tip_cont =  '<div class="tips"><span>';
        tip_cont += msg;
        tip_cont +='</span></div>';
        if (!$(".tips")[0]) {
            $("body").append(tip_cont);
        }else{
            $(".tips>span").html(msg);
        }
        $(".tips").show().delay(1200).hide(0,function(){
            $(this).remove();
        });
    }
    // CSS样式
   /* 
   .tips {
      position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;text-align: center;  z-index: 100;
    }

  .tips span {
    position: absolute;top: 75%;left: 50%;display: inline-block;padding: 8px 18px;max-width: 80%;line-height: 1.5;font-size: 1.6rem;color: #fff;border-radius: 20px;overflow: hidden;background: rgba(50,50,50,.8);-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);
  }
  */

  // 上传文件
  // 判断文件类型
    str=$(this).val();
    var arr=str.split('\\');//注split可以用字符或字符串分割
    var my=arr[arr.length-1];
    var end=my.split('.');
    var finend=end[end.length-1];
    if(finend.indexOf('jpg')==-1||finend.indexOf('png')==-1||finend.indexOf('jpeg')==-1){
      tips('图片格式不正确');
      return false;
    }
    // 将文件框包含的内容传进新建的formData对象
    var formData = new FormData();
    var name = $("#cardPhoto").val();
    formData.append("file",$("#cardPhoto")[0].files[0]);
    formData.append("name",name);


// 判断浏览器信息
     var useragent = navigator.userAgent;
      if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
          // 这里警告框会阻塞当前页面继续加载
          alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
          
      }
    var IP='http://112.124.15.205:8090';

// 对url栏进行操作
    if(window.location.href.indexOf('communityId')==-1){
      if(window.location.href.indexOf('?')==-1){
        history.pushState('','',window.location.href+'?communityId=1');
      }else{
        history.pushState('','',window.location.href+'&communityId=1');
      }
    }
// 谷歌浏览器开发过程中的跨域问题
C:\Users\H\AppData\Local\Google\Chrome\Application\chrome.exe --disable-web-security --user-data-dir=D:\MyChromeDevUserData
