function send(url, postData, async, method, foo){
	alert("异步请求中");
}

function getCookieVal(offset){
	var endstr=document.cookie.indexOf(";",offset);
	if(endstr==-1)
		endstr=window.document.cookie.length;
	return document.cookie.substring(offset,endstr)
} 

function getCookie(name){
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen){
		var j=i+alen;
		if(document.cookie.substring(i,j)==arg)
			return getCookieVal(j);
		i=document.cookie.indexOf(" ",i)+1;
		if(i==0)
		break
	}
	return null
};  

 if(window.location.href.indexOf("eixin.sogou.com/antispider/?from")>=0){
	console.log("是验证码页面==================");
 	setTimeout(function() {
		delAllCookie();
		console.log("已经删除所有必须验证码");	
	 	window.location.href="http://weixin.sogou.com/weixin?type=1&query=rmrbwxx&ie=utf8&_sug_=y&_sug_type_=";		
	}, 3000);
 }else if(window.location.href.indexOf("eixin.sogou.com/weixin?type=")>=0){
	console.log("不是验证码页面");
	console.log(window.location.href.indexOf("eixin.sogou.com/weixin?type="));
	var cookie=getCookie("SNUID");
	if(cookie.length==32){
		$.getJSON("http://localhost:8080/setSNUID.php?id="+getCookie("SNUID"),{},function(res){
			if(res.data==1){
				console.log(cookie);
			}else{
				console.log(res.data);
			}
		},"jsonp");
	}else{
		alert("失败"+cookie);
	}
}

var Cookie=new Object(); 
Cookie.setCookie=function(name, value, option){ 
    var str=name+'='+escape(value); 
    if(option){ 
        if(option.expireHours){ 
            var d=new Date(); 
            d.setTime(d.getTime()+option.expireHours*3600*1000); 
            str+='; expires='+d.toGMTString(); 
        } 
        if(option.path) str+='; path='+option.path; 
        if(option.domain) str+='; domain='+option.domain; 
        if(option.secure) str+='; true'; 
    } 
    document.cookie=str; 
}
Cookie.getCookie=function(name){ 
    var arr = document.cookie.split('; '); 
    if(arr.length==0) return ''; 
    for(var i=0; i <arr.length; i++){ 
        tmp = arr[i].split('='); 
        if(tmp[0]==name) return unescape(tmp[1]); 
    } 
    return ''; 
}

Cookie.delCookie=function(name,doma){ 
    this.setCookie(name,'',{expireHours:-1,domain:doma}); 
}

function delAllCookie(){
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; "); // 将多cookie切割为多个名/值对
	for(var i=0;i <arrCookie.length;i++){ // 遍历cookie数组，处理每个cookie对
		var arr=arrCookie[i].split("=");
	    	if(arr.length>0){
	    		Cookie.delCookie(arr[0],".sogou.com");
	    		Cookie.delCookie(arr[0],".weixin.sogou.com");
	    	}
	}
}

//清除cookie和刷新
$(document).ready(function(){
	setTimeout(function() {
		delAllCookie();
		console.log("已经删除所有必须验证码");	
	}, 1000);
	setTimeout(function() {
		window.location.href="http://weixin.sogou.com/weixin?type=1&query=rmrbwxx&ie=utf8&_sug_=y&_sug_type_=";
	},2000);
});


