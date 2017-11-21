$(".selectall a:eq(0)").click(function() {
	if($(".selectall a").eq(0).prop("checked")) {
		$(this).nextAll().prop("checked",true);
	}else {
		$(this).nextAll().prop("checked",false);
	}
});