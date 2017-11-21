$("#submit-btn").click(function() {
	var url = "http://nmid.gojay.xin:8080/Trade/api/goods/askGoods";
   $.ajax({
        type: "post",
        url: url,
        data: {
          userId: 1,
          name: $(".goods_name").val(),
          price: $(".goods_price").val(),
          catagory: $(".commodity").find("option:selected").val(),
          detail:  $(".addition textarea").val(),
        },
        dataType: "json",
        success: function (data) {
          if(data.statusCode == "201") {
            alert("发布成功！！！");
            window.location.href = "homepage.html";
          }  
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
});