function setCookie(name,value,iDay) {//名字 值 过期时间
	var oData=new Date();
	oData.setData(oData.getData()+iDay);
	document.cookie = name+"="+value+";erpires="+oData;
}
function getCookie(name) {
	var arr = document.cookie.split(';');//'username=abc；password=354654;bbb=54sd545' cookie格式 使用分割方式
	for(i=0;i<arr.length;i++) {
		var arr2 = arr[i].split('=');//将username=abc 使用=分割开
		if (arr2[0]==name) {
		return arr2[1];//判断值，并且返回
		}
	else if(i==arr.length-1) {
		return "";//没有就返回空值
		}
	}	
}
function removeCookie(name) {
	setCookie(name,"1",-1)
}