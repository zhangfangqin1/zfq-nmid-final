$(document).ready(function() {

			
/*
    			var imgs = [];
    			$("#goods-wrapper img").each(function() {
    				imgs.push($(this).attr("src"));
    			})

    			var Text = [];
    			$("#goods-wrapper p a").each(function() {
    				Text.push($(this).text());
    			})

    			var text = [];
    			$("#goods-wrapper p span").each(function() {
    				text.push($(this).text());
    			})*/

    $(function() {
    	$("#goods-wrapper").find("li").each(function() {
    		$(this).click(function() {
    			var num = $(this).index();
    			alert(num);
    		})
    	})
    })			
    			
});