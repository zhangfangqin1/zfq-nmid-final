$(function(){
	var file = {
		m_upload: function(e){
			var m_file = e.target.files;
			//file里面存放有文件的名字(name)、格式(type)、大小(size)、上传时间(time)等等
			var name='', div='',image='';
			for(var i=0;i<m_file.length;i++){
				var z = m_file[i];
				var type = z.type.split('/')[0];
				if (type !='image') {
				alert('请上传图片');
					return;
				}
				var reader = new FileReader();
				console.log(file);
				console.log(reader);
				reader.readAsDataURL(z); 
				// console.log(z.name);
				reader.onloadstart = function() {
					console.log('start');
				}
				reader.onload = function() {
					console.log('load complete');
				}
				reader.onloadend = (function(i){
				return function(){
				console.log();
				console.log(i);
				image = '<img src="'+ this.result +'"/>';
			    var imglist = '<div class="img_box"><span class="delete">X</span>'+image + '</div>';
				$(".m_img_holder").append(imglist);
			};
		})(z);
	};
},

		event: function(){
		$("#upload").change(function(e){
		$(".progress").removeClass("none");
			file.upload(e);
		});
		$("#m_upload").change(function(e){
			file.m_upload(e);
		});
		//删除文件
		$(".file_upload").delegate(".delete","click",function(){
			var o = $(this);
			o.parents(".img_box").remove();//并没有清空input里面的值
			$(".progress").addClass("none");
			$("#upload,#m_upload").val('');
		})
	},
		init: function(){
			this.event();
		}
	}
	file.init();
}());

$("#submit-btn").click(function() {
	var url = "http://nmid.gojay.xin:8080/Trade/api/goods/publishGoods";
   $.ajax({
        type: "post",
        url: url,
        data: {
           userId: 1,
           name: $(".check").val(),
           price: $(".goods_price").val(),
           catagory: $(".commodity").find("option:selected").val(),
           detail:  $(".menu-name").find("option:selected").val(),
        },
        dataType: "json",
        success: function (data) {
            alert(1);
            console.log(data);
       		alert("发布成功！")
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("请求失败！");
        }
    });
});