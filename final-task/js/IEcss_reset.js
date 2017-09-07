/* 兼容IE9以下不能使用媒体查询问题 */
function IEcss(){ // IE8以下的不能使用媒体查询的问题解决办法
	var ScreenWidth=document.documentElement.clientWidth || document.body.clientWidth;
	if(ScreenWidth<1205){
		var isIE=!!window.ActiveXObject; 
		var isIE6=isIE&&!window.XMLHttpRequest; 
		var isIE8=isIE&&!!document.documentMode; 
		var isIE7=isIE&&!isIE6&&!isIE8; 
		if (isIE){ 
			if (isIE6 || isIE8 || isIE7){
				$("#666").remove();
				var Link="<link type='text/css' rel='stylesheet' href='css/IE_min.css' id='666' >"
				$("head").append(Link);
			}
		} 
	}
	else if(ScreenWidth>1205){
		$("#666").remove();
	}
}
