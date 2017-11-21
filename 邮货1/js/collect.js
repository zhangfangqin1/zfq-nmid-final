$(document).ready(function() {
	$(".collect a:eq(0)").click(function() {

		var url1 = "http://nmid.gojay.xin:8080/Trade/api/button/starGoods/" + "1/" + "20";
		var url2 = "http://nmid.gojay.xin:8080/Trade/api/button/unstarGoods/" + "1/" + "20";
		if($(".collect a img").attr("src") == "../images/collect.png") {
			$(".collect a img").attr("src","../images/collected.png");
			$(".collect span").html("取消收藏");

			$.ajax({
        		type: "get",
        		url: url1,
        		data: {
           
        		},
        		dataType: "json",
        		success: function (data) {
            		
           			if(data.statusCode == 201) {
           				alert("收藏成功！");
           				console.log(data);
           			}
        		},
        		error: function (XMLHttpRequest, textStatus, errorThrown) {
            	alert("请求失败！");
        		}
    		});
		} else {
			$(".collect a img").attr("src","../images/collect.png");
			alert("确定取消收藏？亲！！！")
			$.ajax({
        		type: "get",
        		url: url2,
        		data: {
           
        		},
        		dataType: "json",
        		success: function (data) {
            		
            		if(data.statusCode == 204) {
           			
           				alert("取消收藏成功！");
           				console.log(data);
           			}
        		},
        		error: function (XMLHttpRequest, textStatus, errorThrown) {
            	alert("请求失败！");
        		}
    		});
			$(".collect span").html("收藏");
		}

	});
});


  