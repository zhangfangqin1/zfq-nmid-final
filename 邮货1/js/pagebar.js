var ul = document.getElementById('number');
var li = ul.getElementsByTagName('li');
var type = document.getElementById('search');
var btn = document.getElementById('btn');
li[2].className = 'background';
var num1 = 1;
var num2 = 10;
//给表示页数的三个li写上页数
content(num1);
function content(number){
    for(var i=0 ; i<li.length-4 ; i++){
        li[i+2].innerHTML = number;
        number++;
    }
}

//把所有的分页背景去掉，给指定的分页添加背景颜色
function Background(num){
    for(var i = 0;i<li.length;i++){
       	li[i].className = li[i].className.replace('background','');
        li[num].className = 'background';
    }
} 
//首页的点击事件
li[0].onclick = function(){
    Background(2);
    num1 = 1;
    content(num1);
    var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + num1;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
}
//尾页的点击事件
li[li.length-1].onclick = function(){
    Background(li.length-3);
    num1 = num2-(li.length-5);
    content(num1);
    var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + num1;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            alert(1);
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
}
//上一页的点击事件
li[li.length-(li.length-1)].onclick = function(){

    for(var j = 0;j<li.length-4;j++){
        if(li[j+2].className == 'background' && li[j+2].innerHTML != 1){
            if(j+2 != li.length-(li.length-2)){
                Background(j+1);
            }
            break;
        }
    }
    if(j+2 == li.length-(li.length-2)){
        num1 -- ;
        content(num1);
    }
    
    var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + num1;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
}
//下一页的点击事件
li[li.length-2].onclick = function(){
    for(var j = 0;j<li.length;j++){
        if(li[j].className == 'background' && li[j].innerHTML < num2){  //* && 写最后一页的总数*/
            if(j+1 < li.length-2){
                Background(j+1);
            }
            break;
        }
    }
    if(j+1 == li.length-2){
        num1++;
        content(num1);
    }

    var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + num1;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
}        
//分页的点击事件
for(var i = 0;i<li.length-4;i++){
    li[i+2].index = i+2;
    li[i+2].onclick = function(){
        Background(this.index);
        var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + num1;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
    }

    
}
//跳转事件       
btn.onclick = function(){

	if(type.value>2&&type.value<num2-1){
		Background(2);
		content(type.value);
        var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + type.value;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
	}

	else if(type.value == 1){
		Background(2);
		content(1);
        var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + type.value;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
	}

	else if(type.value == 2){
		Background(2);
		content(2);
         var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + type.value;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
	}

	else if(type.value == num2){
		Background(4);
		content(num2-2);
         var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + type.value;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
	}

	else if(type.value == num2 - 1){
		Background(3);
		content(num2-2);
         var url = "http://nmid.gojay.xin:8080/Trade/api/goods/listPublishGoodsByTime/" + type.value;
    $.ajax({
        type: "get",
        url: url,
        data: {
           
        },
        dataType: "json",
        success: function (data) {
            
            $.each(data.body.list, function(i, item) {
            /*$("#goods-list li div img").attr("src", "http://nmid.gojay.xin:8080/Trade/upload/images/ + item.image");*/
            
            $("#goods-wrapper li div p a:eq("+i+")").html(item.name);
            $("#goods-wrapper li div p span:eq("+i+")").html(item.price);
        });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
	}
}



