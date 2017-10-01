window.onload = function() {
	var Page = document.getElementById("page");
	var li = Page.getElementsByTagName("li");
	var Search = document.getElementById("search");
	var Btn = document.getElementById("btn");
	li[2].className = "background";
	var number1 = 1;
	var number2 = 20;
	Add(number1);

	/*给页码加上页数*/
	function Add(number) {
		for(i=0; i<li.length-4; i++) {
			li[i+2].innerHTML = number;
			number++;
		}
	}

	/*给指定的页数加上背景颜色*/
	function ChangeColor(number) {
		for(var i=0; i<li.length; i++) {
			li[i].className = "";
			li[number].className = "background";

		}
	}

	/*首页的点击事件*/
	li[0].onclick = function() {
		ChangeColor(2);
		number1 = 1;
		Add(number1);
	}

	/*尾页的点击事件*/
	li[li.length-1].onclick = function() {
		ChangeColor(li.length-3);
		number1 = number2 - (li.length-5);
		Add(number1);
	}

	/*上一页的点击事件*/
	li[li.length - (li.length-1)].onclick = function() {
		for(var j=0; j<length-4; j++) {
			if(li[j+2].className == "background"&&li[j+2].innerHTML != 1) {
				if (j+2 != li.length - (li.length-2)) {
					ChangeColor(j+1);
				}
				break;
			}
		}
		if(j+2 == li.length - (li.length-2)) {
			number1 --;
			Add(number1);
		}
	}

	/*下一页的点击事件*/
	li[li.length-2].onclick = function() {
		for(var j=0; j<li.length; j++){
			if(li[j].className == "background"&&li[j].innerHTML < number2) {
				if(j+1<li.length-2) {
					ChangeColor(j+1);
				}
				break;
			}
		}
		if(j + 1 == li.length-2) {
			number1++;
			Add(number1);
		}
	}

	/*分页的点击事件*/
	for(var i = 0; i < li.length-4; i++) {
		li[i+2].index = i+2;
		li[i+2].onclick = function() {
			ChangeColor(this.index);
		}
	}

	/*跳转事件*/
	Btn.onclick = function() {
		if (Search.value>2&&Search.value<number2-1) {
			ChangeColor(2);
			Add(Search.value);
		}
		else if(Search.value == 1) {
			ChangeColor(2);
			Add(1);
		}
		else if(Search.value == 2) {
			ChangeColor(3);
			Add(2);
		}
		else if(Search.value == number2) {
			ChangeColor(4);
			Add(number2-2);
		}
		else if(Search.value === number2-1) {
			ChangeColor(3);
			Add(number2-2);
		}
	}
}; 