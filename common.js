// 地址栏通过url获取参数值
// 1.设置或获取对象指定的文件名或路径。

alert(window.location.pathname)
// 2.设置或获取整个 URL 为字符串。

alert(window.location.href);

// 3.设置或获取与 URL 关联的端口号码。

alert(window.location.port)

// 4.设置或获取 URL 的协议部分。

alert(window.location.protocol)

// 5.设置或获取 href 属性中在井号“#”后面的分段。

alert(window.location.hash)

// 6.设置或获取 location 或 URL 的 hostname 和 port 号码。

alert(window.location.host)

// 7.设置或获取 href 属性中跟在问号后面的部分。

alert(window.location.search)

// 8.获取变量的值(截取等号后面的部分)

 var url = window.location.search;

//    alert(url.length);

//    alert(url.lastIndexOf('='));

var loc = url.substring(url.lastIndexOf('=')+1, url.length);

// 9.用来得到当前网页的域名

var domain = document.domain;

stay hungry stay foolish！

function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return unescape(r[2]); return null;
    }
    var classId=GetQueryString('classId');

// 10.通过对Date原型链创建属性,将Date转化为统一的格式
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

// 11.上传文件
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
  // ajax上传文件
    $.ajax({
      url: 'http://localhost:8081/file_upload',
      type: 'POST',
      dataType: 'formData',
      enctype: "multipart/form-data",
      processData: false,//用于对data参数进行序列化处理 这里必须false
      contentType: false,//这里的contentType也必须为false
      data:formData,
      complete: function(data) {
        console.log("success"+JSON.stringify(data));
        // console.log(formData);
      },
      fail: function(data) {
        console.log("error"+data.json());
      }
    })

    fetch(that.serverIP.uploadFile,{
      method: 'POST',
      body: formData
    }).then((res) => {
        res.json();
        if(res.ok){
            that.tips('文件上传成功','1000');
            $('#upLoadFilePop').modal('hide');
            nextFunction();
        }else{
            that.tips( '文件上传出错', '1000');
        }
   }).then((data) => {
        if(data.status == 200){
            that.tips('图形已添加至图层');
        }else if(data.status == 500){
            that.tips('图形识别失败，请检查数据格式');
        }
   }).catch(error=>{
        console.log(error);
        that.tips('与服务器连接失败，请稍后重试');})


// 12. 判断浏览器信息
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');

}
var IP='http://112.124.15.205:8090';

// 13.对url栏进行操作
if(window.location.href.indexOf('communityId')==-1){
  if(window.location.href.indexOf('?')==-1){
    history.pushState('','',window.location.href+'?communityId=1');
  }else{
    history.pushState('','',window.location.href+'&communityId=1');
  }
}

// 14. 谷歌浏览器设置安全模式,可解决开发过程中的跨域问题
"C:\Users\H\AppData\Local\Google\Chrome\Application\chrome.exe --disable-web-security" --user-data-dir=D:\MyChromeDevUserData

// 15.open layer加载天地图
var tiandiTile = new ol.layer.Tile({
    source:new ol.source.XYZ({
        url:"http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
    }),
    name:'天地图底图',
    opacity:.5,
    id:'share666'
});
var tiandiLabel = new ol.layer.Tile({
    name: "天地图文字标注",
    id:'share777',
    source: new ol.source.XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
    })
});
var tiandiImage = new ol.layer.Tile({
    name: "天地图卫星影像",
    id:'share333',
    source: new ol.source.XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}'
    })
});


// 16.消息通知,模态框
tips=function tips(msg,delay){
  var tip_cont =  "<div class='tips'><span>";tip_cont += msg;tip_cont +='</span></div>';
  if (!$('.tips')[0]) {  $('body').append(tip_cont); }
  else
  {  $('.tips>span').html(msg); }
  var delay=(delay)?(delay):(2000);
  $('.tips').show().delay(delay).hide(0,    function(){      /*$(this).remove();*/    });
}

tipsRoll=function tipsRoll(msg,delay){
  var tip_cont =  "<div class='tipsRoll'><span>";tip_cont += msg;tip_cont +='</span></div>';if (!$('.tipsRoll')[0]) {  $('body').append(tip_cont); }else{  $('.tipsRoll>span').html(msg); }
  var delay=(delay)?(delay):(2000);
  $('.tipsRoll span').css('left',-$('.tipsRoll span').width());
  var timeout='';
  // var y=8;
  var y=Math.ceil($('body').width()/700);
  // console.log(y);
  function tipsRoll(){
    var x=Math.ceil($('.tipsRoll span').css('left').split('px')[0]);
    if(x>$('body').width()){
      clearTimeout(timeout);
      return false;
    }else{
      x=Math.ceil($('.tipsRoll span').css('left').split('px')[0]);
      $('.tipsRoll span').css('left',(x+y+'px'));
      // console.log(x+y);
      // 定时函数的格式！
      timeout=setTimeout(function(){tipsRoll()},1);
    }
    // $('.tipsRoll').show().delay(delay).hide(0,function(){      /*$(this).remove();*/    });
  }
  // 触摸停止滚动
  /*$('.tipsRoll').on('mouseover',function(){
    // console.log('in');
    clearTimeout(timeout);
  })
   $('.tipsRoll').on('mouseout',function(){
    // console.log('out');
    tipsRoll();
  })*/
  tipsRoll();
}

returnTop=function returnTop(){
  var getTopFunction='';
  var xx=$('#app').scrollTop()/20;
  // 按照百分比滚动
  // 先写定时函数，再清除，否则无效
  function getTop(){
    getTopFunction=setTimeout(getTop,5);
    if($('#app').scrollTop()>0){
      $('#app').scrollTop($('#app').scrollTop()-xx);
    }else{
      clearTimeout(getTopFunction);
    }
    // 函数不加括号，字符串加括号
  }
  getTop();
}

confirms = function(msg,yes,no){
        /*
        * 消息通知
        * @param{string，number} msg 显示的信息  msg 显示时间
        */
        var that = this;
        var id = new Date().getTime();
        var title = (msg.title)?(msg.title):"提示";
        var confirms_fade = '<div class="confirms-layer-shade" id="fade'+id+'" times="3"></div>';
        var confirm_cont =  '<div class="confirms-layer confirms-layer-dialog layer-anim" id="confirms'+id+'" type="dialog" times="3" showtime="0" contype="string" ><div class="confirms-layer-title">'+title+'</div><div id="" class="confirms-layer-content confirms-layer-padding"><i class="confirms-layer-ico confirms-layer-ico3"></i>'+msg.info+'</div><span class="confirms-layer-setwin"><a class="confirms-layer-ico confirms-layer-close confirms-layer-close1" href="javascript:;"></a></span><div class="confirms-layer-btn confirms-layer-btn-"><a class="confirms-layer-sure">确定</a><a class="confirms-layer-cancel">取消</a></div><span class="confirms-layer-resize"></span></div>';
             // console.log(confirm_cont);
            $('body').append(confirms_fade);
            $('body').append(confirm_cont);
            var top = ($('body').height()-$('.confirms-layer-dialog').height())/2-$('body').height()/10;
            var left = ($('body').width()-$('.confirms-layer-dialog').width())/2;
            // console.log(top,left);
            $('.confirms-layer-dialog').css({'top':top+'px','left':left+'px'});
            var foundFadeTarget = '#fade'+id;
            var foundTarget = '#confirms'+id;
            $(foundTarget).find('.confirms-layer-close').eq(0).off('click').on('click',function(){
                $(foundFadeTarget).fadeOut();
                $(foundTarget).fadeOut();
            })
            $(foundTarget).find('.confirms-layer-sure').eq(0).off('click').on('click',function(){
                $(foundFadeTarget).fadeOut();
                $(foundTarget).fadeOut();
                (yes)?(yes()):(console.log(''));
            })

            $(foundTarget).find('.confirms-layer-cancel').eq(0).off('click').on('click',function(){
                console.log($(foundTarget));
                $(foundFadeTarget).fadeOut();
                $(foundTarget).fadeOut();
                (no)?(no()):(console.log(''));
            })
}

17. 浏览器复制
  function copyUrl(copyValue){
        if(!copyValue){
          copyValue='you copy nothing~';
        }
        var oInput = document.createElement('input');
        oInput.value = copyValue;
        oInput.style.position='absolute';
        oInput.style.top='0';
        oInput.style.right='0';
        oInput.style.zIndex='-3';
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        document.body.removeChild(oInput);
        tips('复制成功');
  }
