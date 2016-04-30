var winH=$(window).height();
//编辑
function edit() {
	$(".outPop").height(winH-50);
	$(".autoFlow_con").height(winH-50-320);
	$(".outPop").animate({right:"0"});
	$(".fixed_btnRow").animate({right:"20px"});
	$("#zz_info").hide();
	$(".headPop").show();
}
//添加路线
function addLine() {
	$(".outPop").animate({right:"0"}).css({height:"100%"});
	//$("#subConts").show();
	$(".autoFlow_con").height(winH-320);
	$("#zz_info").animate({right:"-800px"});
	$(".fixed_btnRow").animate({right:"20px"});
}

//添加计划
function add_plan() {
	$(".popInner").hide();
	$("#add_plan").show();
}
//shutDown
function shutDown() {
	$(".outPop").animate({right:"-800px"});
	$(".fixed_btnRow").animate({right:"-800px"});
	
}
//添加行程
$("#before_set").delegate('li:first','click',function() {
	var liTxt=$(this).html();
	var insertLi='<li>'+liTxt+'</li>';
	$("#after_set").append(insertLi);
	$(this).remove();
	
});

$(".add_set").click( function() {
	var txt=$("#before_set li").length+$("#after_set li").length+1;
	var innerTxt="D"+txt;
	var txt='<li><a href="#">'+innerTxt+'</a></li>';
	$("#before_set").append(txt);
});
$(".remove_set").click( function() {
	$("#before_set li:last").remove();
});
//dateTime
$('#datetimepicker').datetimepicker({
        language:  'zh-CN',
		format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 0,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		//forceParse: 0
});

$('#datetimepicker').datetimepicker('show');
//travel_infoTab
$(".travel_infoTab li").click(function(){
	var curLi=$(this);
	$(".tabPanel").removeClass("show");
	$(".tabPanel").eq($(".travel_infoTab li").index(curLi)).addClass("show");
	$(".travel_infoTab li.active").removeClass("active");
	curLi.addClass("active");
});

//timeOut
$(function(){
   $(".timeOut").popover({
       trigger:'manual',
       placement : 'left',
       html: 'true', 
       content: '<div class="popCon_time">设置时间停留 <input type" class="form-control w80 mr10"><a id="btn_time" class="btn_s red_btn" href="#">确定</a></div>',
       animation: false
        }).on("click", function () {
           var _this = this;
           $(this).popover("toggle");
		   $("#btn_time").click( function() { $('.timeOut').popover('hide') });
         })
		 
});
//step tab
$(".step_info li").delegate('.stepTxt','click',function(){
	var b=$(this);
	$(".each_step").hide();
	$(".each_step").eq($(".step_info li .stepTxt").index(b)).show();
});
//eveStep_menu
$(".eveStep_menu").delegate('li','click',function(){
	var t=$(this);
	$(".tab_pro").hide();
    $(".tab_pro").eq($(".eveStep_menu li").index(t)).show();
});

//扩展说明-关于服务 tab切换
$(".menu_b").delegate(' a','click',function(){
	var b=$(this);
	$(".text_area").hide();
    $(".text_area").eq($(".menu_b a").index(b)).show();
	$(".menu_b a.active").removeClass("active");
	$(this).addClass("active");
});

//添加计划 方案 tab切换
$(".menuA").delegate('a','click',function(){
	var c=$(this);
	$(this).siblings(".active").removeClass("active");
	$(this).addClass("active");
	$(this).parents(".menuA").next(".tabM_con").find(".box_yellow").hide();
    $(".tabM_con .box_yellow").eq($(".menuA a").index(c)).show();
});
//spreadBtn
$(".spreadBtn").click( function() {
	$(this).next(".fold_info").toggle();
	$(this).toggleClass("s_up");
	$(this).parents("tr").siblings().find(".fold_info").hide();
	$(this).parents("tr").siblings().find(".s_up").removeClass("s_up");
});

//tab3  tab切换
$(".tab3").delegate('a','click',function(){
	$(".tab_default").hide();
	var d=$(this);
	$(this).siblings(".active").removeClass("active");
	$(this).addClass("active");
	$(this).parents(".tab3").next(".tab3_con").find(".tab3_row").hide();
    $(".tab3_con .tab3_row").eq($(".tab3 a").index(d)).show();
});