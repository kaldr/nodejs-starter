var bar_width=$("#sideBar").width();
var win_width=$(window).width();
var main_w=win_width-180-840;
function opened() {
	$("#main").animate({width:main_w},600);
	$(".pad_M").hide();
	$(".mid_side").animate({width:0},600);
	$("#zz_info").animate({right:"0"},600);
}

function coll() {
	$("#zz_info").animate({right:"-800px"},600);
	$(".pad_M").show();
	$(".mid_side").animate({width:"60%"},600);
	$("#main").animate({width:"100%"},600);
}
	
	
