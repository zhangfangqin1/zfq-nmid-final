window.onload = function() {
	/*获取鼠标滑过或点击的标签和要切换内容的元素*/
	var titles = document.getElementById("notice-tit");
	var titlesLi = titles.getElementsByTagName("li");
	var divs = document.getElementById("notice-con");
	var mods = divs.getElementsByTagName("div");
	/*遍历titles下所有的li*/
	for(var i=0; i<titlesLi.length; i++) {
		titlesLi[i].index = i;
		titlesLi[i].onclick = function() {
			/*清除li上的class*/
			for(var j =0; j<titlesLi.length; j++) {
				titlesLi[j].className = "";
				mods[j].style.display = "none";
			}
			/*设置当前高亮显示*/
			this.className = "select";
			mods[this.index].style.display = "block";
		}
	}
};