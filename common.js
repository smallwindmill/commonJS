// 地址栏通过url获取参数值
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
   /* .tips {
      position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;text-align: center;  z-index: 100;
    }

  .tips span {
    position: absolute;top: 50%;left: 50%;display: inline-block;padding: 10px 15px;max-width: 80%;line-height: 1.5;font-size: 1.4rem;color:  #fff;border-radius: 20px;overflow: hidden;background: rgba(0,0,0,.7);-webkit-transform: translate(-50%, -50%);        transform: translate(-50%, -50%);
  }*/