(function ($) {
	 $.fn.eachClick = function (obj,callback) {
	    	obj.each(function(){
				$(this).click(function(){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					var index = $(this).index();
					callback&&callback(index);
				})
			})
    };


    $.fn.noData = function(msg,imgurl,callback){
    	if(document.getElementById("nodata")){
    		$("body").css("overflow","hidden");
    	}else{
    		$(this).append('<div class="null" id="nodata">'
								+'<img src="'+imgurl+'" alt="" class="nullImg"/>'
								+'<p class="nullMsg">'+msg+'</p>'
							+'</div>');
    	}
    };
})(jQuery)

;function closeNoData(){
	$("#nodata").remove();
	$("body").css("overflow","auto");
};
