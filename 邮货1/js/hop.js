$(document).ready(function() {
    
    $("#goods-wrapper").find("li").each(function() {
    	$(this).click(function() {
    		window.location.href = "commodity.html";
    	});
    });				
});