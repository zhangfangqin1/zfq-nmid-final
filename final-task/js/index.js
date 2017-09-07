jQuery.support.cors = true;/*IE支持JQ.ajax()方法*/
/*不再提示cookie操作*/
$(document).ready(function() {
	$(".top-right").bind("click",function() {
		setCookie("Noremind","1",30);/*设置本地缓存，过期时间为30天*/
		$(".section-1").remove();
	})
})

/*关注和登录功能*/
$(document).ready(function() {
	$(".Log-or-foucs").bind("click",function(e) {
		var Log = getCookie("loginSuc");
		/*没有账号*/
		if(Log=="") {
			/*弹出登录窗*/
			$(".Log-in").css("zIndex","6666");
			$(".Log-Mask").css("background","#000");
			$("body").css("overflow-y","hidden");
			$(".Log-in").css({display:"block",opacity:"0",filter:"alpha(opacity=0"}).animate({opacity:"1",filter:"alpha(opacity=100)"},400);
		}
		else {
			/*有账号的情况下登录完成后显示已关注样式*/
			setCookie("followsSuc","yes",30);
			var fensNumber = parseInt($(".fens span").text());
			fensNumber+=1;
			$(".focus").css("display","block");
			$(".fens span").text(fensNumber);
		}
		e.preventDefault();
	})
	/*取消关注*/
	$(".foucsed a").bind("click",function(e) {
		removeCookie("followsSuc");
		var fensNumber = parseInt($(".fens span").text());
		fensNumber-=1;
		$(".foucsed").css("display","none");
		$("focus").css("display","block");
		$(".fens span").text(fensNumber);
		e.preventDefault();
	})

	/*关闭登录弹窗*/
	function closeLogin() {
		$("body").css("overflow-y","auto");
		$(".Log-in").animate({opacity:"0",filter:"alpha(opacity=0)",display:"none"},400,function() {
			$(".Log-in").css("zIndex","-1");
			$(".Log-Mask").css("background","#fff");/*兼容IE低版本蒙版未能隐藏问题*/
		});
	}

	/*关闭按钮*/
	$(".Log-main p").bind("click",function() {
		closeLogin();
	})
	$("#Log-Go").bind("click",function() {
		confirm();
	})

	/*确认账号密码*/
	function confirm() {
		var Id = $("#Identity").val();
		var pSword = $("#PassWord").val();
		Id = md5(Id);pSword = md5(pSword);
		$.ajax({
			url:"http://study.163.com/webDev/login.htm?userName="+Id+"&password="+pSword+"",
			type:'GET',
			success : function(data,aDate) {
				/*匹配用户名和密码*/
				if(data==1) {
					alert("登录成功");
					$.ajax({
						url:'http;://study.163.com/webDev/attention.htm',
						type:'GET',
						success : function(data) {
							/*设置关注cookieAPI*/
							if(data==1){
								$(".focus").css("display","none");
								$(".foucsed").css("display","block");
								setCookie("followsSuc","yes",30);
							}
						}
					})
					setCookie("loginSuc","1",30);
					closeLogin();
				}
				else{
					alert("账号非法")
				}
			}
		})
	}

	function Verification(id,pSword) {/*表单验证*/
		if(id=="") {
			var earo = "账号不能为空";
		}
		else if(pSword=="") {
			var earo = "密码不能为空";
		}
		else if(pSword.test(/s+/g)){
			var earo = "密码不能为空格";
		}
	}
})

/*轮播图部分*/
$(document).ready(function() {
	var iNdex = 2;
	var Time = null;
	var num = 1;
	/*自动播放*/
	function autoMove() {
		clearInterval(Time);
		Time = setInterval(function() {
			$(".banner-btn a").css("background","url(images/banner-btn-bg2.png) no-repeat center");
			$(".banner-btn a").eq(num).css("background","url(images/banner-btn-bg.png) no-repeat center");
			$(".Banner-main li").eq(num).css({zIndex:iNdex,opacity:"0"}).animate({opacity:"1"});
			num++;
			if(num==3){
				num=0;
			}
			iNdex++;
		},5000)
	}
	$(".banner-btn a").bind("click",function() {
		clearInterval(Time);
		num = $(this).index();
		$(".banner-btn a").css("background","url(images/banner-btn-bg2) no-repeat center");
		$(".banner-btn a").eq(num).css("background","url(images/banner-btn-bg.png) no-repeat center");
		$(".Banner-main li").eq(num).css({zIndex:iNdex,opacity:"0"}).animate({opacity:"1"});
		iNdex++;	
	})

	/*鼠标移动上去停止播放*/
	$(".Banner-main li").bind("mousemove",function() {
		clearInterval(Time);
	})
	$(".Banner-main li").bind("mouseout",function() {
		num = $(this).index();
		num++;
		if(num==3) {
			num = 0;
		}
		autoMove();
	})
	autoMove();
})

/*工作环境轮播*/
$(document).ready(function() {

})

/*课程的展示*/
$(document).ready(function() {
	var pAge = 0;/*页码数量 */
	var subjectType = 10;/*tab选项卡切换获取数据*/
	var subjectSize = 20;/*不同屏幕下的课程摆放*/

	IEcss();
	getScreenWidth();/*页面打开时自动查询一次初始栏状态展示栏*/
	window.onresize=function() {
		getScreenWidth();
		IEcss();
	}
	/*判断窄屏展示还是宽屏展示*/
	function getScreenWidth() {
		var ScreenWidth = document.documentElement.clientWidth||document.body.clientWidth;
		if(ScreenWidth>1205) {
			subjectSize = 20;
			getSubject(pAge+1,subjectSize,subjectType);
		}
		else {
			subjectSize = 15;
			getSubject(pAge+1,subjectSize,subjectType);
		}
	}

	/*设置每一页课程数量*/
	function setSubjectLi_Number(length) {
		$(".subject-type li").remove();
		var textDiv = "<div id='subject-float' class='hideFloat clear'>"+
		"<img src=''/>"+"<ul>"+"<li>课程名字</li>"+
		"<li><span>学习人数</span>人在学</li>"+
				"<li>发布者：<span>数据1</span></li>"+
				"<li>分类：<span>数据2</span></li>"+
			"</ul>"+
			"<p></p>"+
		"</div>"
		var liText = "<li>"+
			"<img src=''/>"+
			"<p>"+"简介"+"</p>"+
			"<span>"+"音频帮"+"</span>"+
			"<div>"+
				"<span>"+"510"+"</span>"+
			"</div>"+
			"<strong>￥"+"800"+"</strong>"+
		"</li>"
		for(var i=0;i<length;i++) {
			$(".subject-type").append(liText);
		}

		/*绑定鼠标移入 显示和关闭浮层事件*/
		$(".subject-type li").prepend(textDiv);
		$(".subject-type li>img").bind("mouseover",function() {
			/*获取浮层元素*/
			$(".hideFloat").hide();
			$(this).parent().children("#subject-float").show();
		})
		$(".hideFloat").bind("mouseout",function() {
			$(".hideFloat").hide();
		})
	}

	/*设置页码灵活变化*/
	function setPageNumber(pAgeNumber) {
		$(".page-number li:gt(0)").remove();
		for(var i=0;i<pAgeNumber-1;i++) {
			var textNumber = "<li>"+(i+2)+"</li>"
			$(".page-number").append(textNumber);
		}

		/*因为页码重新生成，所以根据上一次的情况 设置显示页码高亮情况*/
		$(".page-number li").css({background:"none",color:"#666"});
		$(".page-number li").eq(pAge).css({background:"#9dd8b1",color:"#fff"});

		/*设置页码按钮点击事件*/
		$(".page-number li").bind("click",function() {
			pAge = $(this).index();
			$(".page-number li").css({background:"none",color:"#666"});
			$(this).css({background:"#9dd8b1",color:"#fff"});
			getSubject(pAge+1,subjectSize,subjectType);
		})
	}

/*设置课程数据*/
function setSubjectData(data) {
	for(var i=0;i<$(".subject-type>li").length;i++){
			$(".subject-type>li:eq("+i+")>img").attr("src",data.list[i].middlePhotoUrl);
			$(".subject-type>li:eq("+i+")>p").text(data.list[i].description)	// 课程简介
			$(".subject-type>li:eq("+i+")>span:eq(0)").text(data.list[i].provider)	// 机构发布者
			$(".subject-type>li:eq("+i+")>div>span").text(data.list[i].learnerCount) //学习人数
			$(".subject-type>li:eq("+i+") strong").text("￥"+data.list[i].price) // 价格
			// 浮层元素添加内容
			$(".subject-type>li:eq("+i+")>div:eq(0)>img").attr("src",data.list[i].middlePhotoUrl);
			$(".subject-type>li:eq("+i+")>div:eq(0)>ul>li:eq(0)").text(data.list[i].name)			// 课程名字
			$(".subject-type>li:eq("+i+")>div:eq(0)>ul>li:eq(1)>span").text(data.list[i].learnerCount)	// 学习人数
			$(".subject-type>li:eq("+i+")>div:eq(0)>ul>li:eq(2)>span").text(data.list[i].provider) 		// 发布者
			$(".subject-type>li:eq("+i+")>div:eq(0)>ul>li:eq(3)>span").text(data.list[i].categoryName) 	// 教育分类
			$(".subject-type>li:eq("+i+")>div:eq(0)>p").text(data.list[i].description)
		}
}

/*获取数据流量*/
function getSubject(page,size,subject) {
	$.ajax({
		url:'http://study.163.com/webDev/couresByCategory.htm?pageNo='+page+'&psize='+size+'&type='+subject,
		dataType:'json',
		success: function(data) {
			var pAgeNumber = data.totalPage;/*获取总页码数*/
			var Lilength = data.totalCount;/*获取数据总数*/
			setPageNumber(pAgeNumber);/*设置页码*/
		if(subjectSize==20) {
			Lilength-=20*(pAge);	/*通过页码判断生成的li的为数量多少*/
					if(Lilength<20){
						setSubjectLi_Number(Lilength);
					}else{
						setSubjectLi_Number(20);
					}	
		}
		else if(subjectSize==15){
					Lilength-=15*(pAge);
					if(Lilength<15){
						setSubjectLi_Number(Lilength);
					}else{
						setSubjectLi_Number(15);	
					}
				}
				setSubjectData(data);
			}
	})
}

/*tab选项卡样式转化*/
$(".subject-left button").bind("click",function () {
	if($(this).index()==0){
		subjectType=10;
		getSubject(pAge+1,subjectSize,subjectType);
	}
	else if($(this).index()==1){
		subjectType=20;
		getSubject(pAge+1,subjectSize,subjectType);
	}
	$(".subject-left button").css({background:"#fff",color:"#666"});
	$(this).css({background:"#39a030",color:"#fff"});
})

/* 上一页 */
	$(".prev").bind("click",function (){
		pAge--;
		if(pAge==-1){
			pAge=$(".page-number li").length-1;
		} 
		getSubject(pAge+1,subjectSize,subjectType);

		/* 更改页码样式 */
		$(".page-number li").css({background:"none",color:"#666"})
		$(".page-number li").eq(pAge).css({background:"#9dd8b1",color:"#FFF"});
	})

	/* 下一页 */
	$(".next").bind("click",function (){
		pAge++;
		if(pAge==$(".page-number li").length){
			pAge=0;
		}
		getSubject(pAge+1,subjectSize,subjectType);

		/* 更改页码样式 */
		$(".page-number li").css({background:"none",color:"#666"})
		$(".page-number li").eq(pAge).css({background:"#9dd8b1",color:"#FFF"});
	})
})

/*热门推荐部分*/
$(document).ready(function() {
	var HotRank_Time = null;
	function setHot_rank_Li(length) {
		var Hot_text = "<li class=clear >"+
			"<img src='' />"+
			"<div class='Rank-content'>"+
				"<span></span>"+
				"<p><span></span></p>"+
			"</div>"+
		"</li>"
		for(var i=0;i<length;i++) {
			$(".Hot-rank>div>ul").append(Hot_text);
		}
	}
	function setHot_rank_Data() {
		$.ajax({
			url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
			type:'GET',
			dataType:'json',
			success:function(data) {
				setHot_rank_Li(20);
				for(var i=0;i<$(".Hot-rank ul>li").length;i++) {
					$(".Hot-rank ul>li:eq("+i+")>img").attr("src",data[i].smallPhotoUrl);
					$(".Hot-rank ul>li:eq("+i+")>div>span").text(data[i].description);
					$(".Hot-rank ul>li:eq("+i+")>div>p>span").text(data[i].learnerCount);
				}
				var text = $(".Hot-rank>div>ul").html();
				$(".Hot-rank ul").append(text);
			}
		})
	}
	function autoMove_toTop() {
		var disY = 0;
		clearInterval(HotRank_Time);
		HotRank_Time = setInterval(function() {
			disY++;
			if(disY==$(".Hot-rank ul").length/2) {
				$(".Hot-rank ul").css("top","0");
			}
			else{
				$(".Hot-rank ul").animate({top:-70*disY+"px"},600);
			}
		},5000)
	}
	setHot_rank_Data();
	autoMove_toTop();
})

/*视频弹窗*/
$(document).ready(function() {
	$(".top-video>p>a").bind("click",function(e) {
		e.preventDefault();/*阻止默认跳转*/
		var Top = document.body.scrollTop||document.documentElement.scrollTop;
		$("body").css("overflow-y","hidden");
		$(".Video").css({top:Top+"px",display:"block"});
	})
	$(".Video-main img").bind("click",function() {
		debugger;
		if((navigator.userAgent.indexOf('MSIE') >= 0) 
		    && (navigator.userAgent.indexOf('Opera') < 0)){
			$("body").css("overflow-y","auto");
			$(".Video").css("display","none");
		}
		else {
			var Myvideo = document.getElementsByTagName("video")[0];
			Myvideo.pause();
			$("body").css("overflow-y","auto");
			$(".Video").css("display","none");
		}
	})
})