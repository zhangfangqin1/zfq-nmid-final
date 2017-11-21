$(document).ready(function() {
	$("#All").change(function() {
		var flage = $(this).is(":checked");
		$("input[type=checkbox]").each(function() {
			$(this).prop("checked",flage);
		});
	});

	$(".selectall a").click(function() {
		alert("确定删除所有商品？");
		$(".mySeek-detail").css("display","none");
	});
});