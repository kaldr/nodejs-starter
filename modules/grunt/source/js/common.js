var bar_width=$("#sideBar").width();
var win_width=$(window).width();
var main_w=win_width-180-840;
function opened() {
	$("#main").animate({width:main_w},600);
	$("#zz_info").animate({right:"0"},600);
}

function coll() {
	$("#zz_info").animate({right:"-800px"},600);
	$(".mid_side").animate({width:"60%"},600);
	$("#main").animate({width:"100%"},600);
    $(".per_list li").removeClass("active");
}


$(".per_list li").click( function() {
	 opened(); 
	 $(this).addClass("active");
	 $(this).siblings().removeClass("active");
	 $(".hideEle").hide();//hideEle元素隐藏
	
});
$(".per_list li").click( function() {
	 $ObjAni.find("div.two").addClass("half");
	 $(".tit_qx").find("span.two").addClass("half");
	 $ObjAni.find("div.one").addClass("full");
	 $(".tit_qx").find("span.one").addClass("full");
})
var memListObj=$(".mem_list")
memListObj.delegate('.lev_1','click', function() {
	$(this).parents("li").toggleClass("active");
	$(this).siblings(".sub_ava").toggle();
	$(this).parents("li").siblings().find(".sub_ava").hide();
	$(this).parents("li").siblings().removeClass("active"); 
});

var $ObjAni=$(".per_list li");
function common() {
	 $(".hideEle").show();//hideEle元素显示
	 $ObjAni.find("div.half").removeClass("half");
	 $ObjAni.find("div.full").removeClass("full");//第一个li添加full class
	 $(".tit_qx").find("span.half").removeClass("half");
	 $(".tit_qx").find("span.full").removeClass("full");
}
$(".coll_btn").click( function() {
	coll();
	common();
	$ObjAni.removeClass("active");
});

//阻止当前事件冒泡
$(".stopPro").click( function(event) {
	event.stopPropagation(); 
});
//点击空白消失	
$(document).bind("click",function(e){ 
	var target = $(e.target); 
	if(target.closest(".emp_obj,#zz_info,.per_list,#toolbar,#info_tipPop").length == 0){ //点击emp_obj意外的元素右侧弹框消失
		coll();
		common();
		
	} 
})

/*--------slide END-----------*/

//sub_menu
$(".sub_menu").delegate('a.menu','click', function() {
	$(".menu.active").removeClass("active")
	$(this).addClass("active");
	$(this).parents("li").siblings().find(".e_r").animate({right:"-120px"});
	$(this).parents("li").siblings().find(".menu").animate({marginLeft:"0"});
});

$(".sub_menu").delegate('.edit','click', function() {
    $(this).parents("li").find(".e_r").animate({right:"0"});
    $(this).parents(".menu").animate({marginLeft:"-30px"}).css("transition","none");
	$(this).parents("li").siblings().find(".e_r").animate({right:"-120px"});
	$(this).parents("li").siblings().find(".menu").animate({marginLeft:"0"});
});

$(".sub_menu").delegate('.subArr_tit','click', function() {
	$(this).next(".subMenu_panel").toggle();
	$(this).toggleClass("active");
	$(this).parents("li").siblings().find(".subArr_tit.active").removeClass("active");
	$(this).parents("li").siblings().find(".subMenu_panel").hide();
});

$(document).bind("click",function(e){ 
	var targetA = $(e.target); 
	if(targetA.closest(".sub_menu,.menu").length == 0){ 
		 $(".e_r").animate({right:"-120px"});
   		 $(".menu").animate({marginLeft:"0"});
	} 
})
//global_navi
$("#navi_btn").click( function() {
	$("#global_navi").show();
});

$(document).bind("click",function(e){ 
	var targetA = $(e.target); 
	if(targetA.closest("#global_navi,#navi_btn").length == 0){ 
		$("#global_navi").hide();
	} 
})

$(".navi li").hover(function() {
	$(this).find("i").animate({width:'56px',height:'56px',left:'-3px',top:'-3px'},100);
},function() {
	$(this).find("i").animate({width:'50px',height:'50px',left:'0',top:'0'},100);
});


$(".navi li").click(function(){
	var curLiA=$(this);
	var txtMenu=$(this).find("span").text();
	$(".sub_menu").hide();
	$(".sub_menu").eq($(".navi li").index(curLiA)).show();
	$("#global_navi").hide();
	curLiA.show();
	$(".subTit span").html(txtMenu);
});

//info_tipPop
$("#info_tipPop").animate({left:'179px'},300);
function hide() {
	$("#info_tipPop").animate({left:'-180px'},100);
}
//------左侧提醒事项
$("#warn_btn").click( function() {
	$("#warn_box").animate({ left:'0'});
});

$("#w_close").click( function() {
	$("#warn_box").animate({ left:'-320px'},200);
});

$(document).bind("click",function(e){ 
	var target = $(e.target); 
	if(target.closest("#warn_btn,#warn_box").length == 0){ 
		$("#warn_box").animate({ left:'-320px'},200);
	} 
})

