var publicurl = "http://agent.lluju.com/"; // 正式服
var publicurlUpData = "http://agent.lluju.com/"
var imgUrl = "https://agent.lluju.com/img/"

// 测试
// var publicurl = "http://192.168.2.180:8090/";
// var publicurlUpData = "http://192.168.2.180:8090/"
// var imgUrl = "http://192.168.2.180:8090/img/"

publicAppName = "LLUJU";

// 使用JQ
document.write('<script type="text/javascript" src="../../script/jquery-2.1.0.js"></script>');

//检测登录
function checkLogin(callback) {
	$api.post(publicurl + "Login/Check.asp", function (ret, err) {
		if (ret.code == 1) {
			callback && callback(true);
		} else if (ret.code == 2) {
			callback && callback(false);
		}
	}, "json");
};

// 设置语言
function setLanguage(language) {
	language = $api.getStorage("language") || 'en-US'
	var str = api.readFile({
		sync: true,
		// path: "../../script/language/" + language + ".json"
		// path: "../../script/language/" + "zh-FT" + ".json"
    // path: "../../script/language/" + "en-US" + ".json"
		// path: "../../script/language/" + "zh-CN" + ".json"
		path: "../../script/language/" + "es-MX" + ".json"
	});
	languageJosn = JSON.parse(str);
};

//获取语言
function getLanguage(){
	var lang = $api.getStorage("language");
	var newScript = document.createElement("script");
	document.getElementsByTagName("head")[0].appendChild(newScript);
	// newScript.src = '../../script/language/' + "zh-CN" + '.json';
	// newScript.src = '../../script/language/' + "en-US" + '.json';
	// newScript.src = '../../script/language/' + lang + '.json';
	newScript.src = '../../script/language/' + "es-MX" + '.json';
}

//获取颜色样式
function getTheme(){
	var colorCss = $api.getStorage("themeColor");
	$(".theme").attr("href","../../css/"+colorCss);
};

function myAlert(content,callback){
	//提示框
	api.alert({
	    title: "Consejos",
	    msg: content,
			buttons: ["confirmar"]
	}, function(ret, err) {
		callback && callback(ret);
	});
};

// 首页按两次返回退出
function fnInitListener () {
		var flag = false;
		api.addEventListener({
				name: 'keyback'
		}, function(ret, err) {
				if (false == flag) {
						api.toast({
							msg: 'Presione nuevamente para salir',
								duration: 2000,
								location: 'bottom'
						});
						flag = true;
						setTimeout(function() {
								flag = false;
						}, 2000);
				} else {
						api.closeWidget({
								silent: true
						});
				}
		});
};

function myConfirm(content,callback){
	//确认框
	api.confirm({
	    title: "Consejos",
	    msg: content,
	    buttons: ["Cancelar","Confirmar"]
	}, function(ret, err) {
	    var index = ret.buttonIndex;
	    if(index == 2){
	    	callback && callback();
	    }
	});
};

function myToast(content,location){ //吐司提示框
	if(!location){
		location = "middle";
	}
	api.toast({
      msg:content,
      duration: 2000,
			location: location
  });
};

function myloading(){
	api.showProgress({
      title: '',
	    text: 'Cargando···',
	    modal: false
    });
};

function closeloading(){
	api.hideProgress();
};

function language() {
  if ($api.getStorage("language") == "en-US" || $api.getStorage("language") == "en-us") {
      return 'en_US';
  } else if($api.getStorage("language") == "zh-CN" || $api.getStorage("language") == "zh-cn") {
      return 'zh-CN'
  } else if($api.getStorage("language") == "zh-FT" || $api.getStorage("language") == "zh-ft") {
      return 'zh-FT'
  } else {
      return 'en_US';
  };
};

// var lg = language();
var lg = "es-MX";

function postAjax(url, data, callback, mask) {
	api.showProgress({
		title: 'Cargando···',
		text: '...',
		modal: true
	});

	data.token = $api.getStorage("token");
	api.ajax({
			url: publicurl + url + "?token=" + $api.getStorage("token") + "&_lang=" + lg,
			headers: {
					"Content-Type": "application/json",
					"authorization": $api.getStorage("token"),
					"_lang": lg
			},
			method: "post",
			data: {
				body: JSON.stringify(data)
			},
			dataType: "json",
	}, function(ret, err) {
		api.hideProgress();
		api.refreshHeaderLoadDone();
		if (ret) {
				console.log("接口--" + publicurl + url + "?token=" + $api.getStorage("token") + "&_lang=" + lg + "--结果--" + JSON.stringify(ret) + "--参数--" + JSON.stringify(data));
				if (ret.code == 2 || ret.code == 3 || ret.code == -1 || ret.code == "E00000028" || ret.code == "E00000010" || ret.code == "E00000001") {
					myAlert(ret.message || ret.msg, function() {
						api.closeToWin({
							name: 'root'
						});
						$api.send("changeYcode");
					});
				} else if (ret.code == 1) {
					callback && callback(ret);
				} else {
					myAlert(ret.message || ret.msg);
					callback && callback(ret);
				}
		};
		if (err) {
			console.log("报错--" + publicurl + url + "?token=" + $api.getStorage("token") + "&_lang=" + lg + "--结果--" + JSON.stringify(ret) + "--参数--" + JSON.stringify(data));
			myAlert("Err：" + JSON.stringify(err));
		};
	})
};

// url 传参
function postAjaxPlus(url,data,callback, load){
	api.showProgress({
		title: '',
		text: 'Cargando···',
		modal: true
	});
	data.token = $api.getStorage("token");
	$api.post(publicurl + url, {
		values:data
	},function(ret,err){
		api.hideProgress();
		api.refreshHeaderLoadDone();
		if(ret){
			console.log("接口--" + publicurl + url + "--结果--" + JSON.stringify(ret) + "--参数--" + JSON.stringify(data));
			if (ret.code == 2 || ret.code == 3 || ret.code == -1 || ret.code == "E00000028" || ret.code == "E00000010" || ret.code == "E00000001") {
				myAlert(ret.message || ret.msg, function() {
					api.closeToWin({
						name: 'root'
					});
					$api.send("changeYcode");
				});
			} else if(ret.code == 1){
				callback && callback(ret);
			} else {
				myAlert(ret.message || ret.msg);
				callback && callback(ret);
			}
		};
		if(err){
			console.log("报错--" + publicurl + url + "?_lang=" + lg + "--结果--" + JSON.stringify(err) + "--参数--" + JSON.stringify(data));
			myAlert("Err：" + url + JSON.stringify(err));
		};
	},"josn");
};

// 统计请求
function postAjax3(url, data, callback) {
	data.token = $api.getStorage("token");
	$api.post(publicurl + url + "?token=" + $api.getStorage("token") + "&_lang=" + lg, {
		values: data
	}, function(ret, err) {
		api.hideProgress();
		api.refreshHeaderLoadDone();
		if (ret) {
			console.log("接口--" + publicurl+url + "?token=" + $api.getStorage("token") + "&_lang=" + lg + "--结果--:"+JSON.stringify(ret) + "--参数--" + JSON.stringify(data));
			if (ret.code == 2 || ret.code == 3 || ret.code == "E00000028" || ret.code == "E00000010" || ret.code == "E00000001" || ret.code == -1) {
				myAlert(ret.message || ret.msg, function() {
					api.closeToWin({
						name: 'root'
					});
					$api.send("changeYcode");
				});
			} else if (ret.code == 1) {
				callback && callback(ret);
			} else if (ret.code == 0) {
				myAlert(ret.message || ret.msg);
				callback && callback(ret);
			} else {
				myAlert(JSON.stringify(ret));
				callback && callback(ret);
			}
		};
		if (err) {
			console.log("报错--" + publicurl + url + "?_lang=" + lg + "--结果--" + JSON.stringify(err) + "--参数--" + JSON.stringify(data));
			myAlert("Err："+ url + JSON.stringify(err));
		};
	}, "josn");
};

//下拉刷新
function myPullDown(callback){
	setLanguage()
	api.setRefreshHeaderInfo({
	    bgColor: '#ccc',
	    textColor: '#fff',
	    textDown: languageJosn.other.textDown,
	    textUp: languageJosn.other.textUp,
	}, function(ret, err) {
	    callback && callback();
	});
};

function myUpLoad(callback){
	api.addEventListener({
	    name:'scrolltobottom',
	    extra:{
        threshold:100
	    }
	}, function(ret, err){
			callback && callback();
	});
};

function isnull(val){
    var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
    if (str == '' || str == undefined || str == null) {
      return true;
    } else {
      return false;
    }
};

function selectArea(callback){
	var UIActionSelector = api.require('UIActionSelector');
	UIActionSelector.open({
	    datas: 'widget://wgt/city.json',
	    layout: {
	        row: 5,
	        col: 3,
	        height: 30,
	        size: 12,
	        sizeActive: 14,
	        rowSpacing: 5,
	        colSpacing: 10,
	        maskBg: 'rgba(0,0,0,0.2)',
	        bg: '#fff',
	        color: '#383838',
	        colorActive: '#f00',
	        colorSelected: '#f00'
	    },
	    animation: true,
	    cancel: {
	        text: 'Cancelar',
	        size: 12,
	        w: 70,
	        h: 35,
	        bg: '#FF490A',
	        bgActive: '#FA906F',
	        color: '#fff',
	        colorActive: '#fff'
	    },
	    ok: {
	        text: 'Confirmar',
	        size: 12,
	        w: 70,
	        h: 35,
	        bg: '#4CA5FF',
	        bgActive: '#9BCBFC',
	        color: '#fff',
	        colorActive: '#fff'
	    },
	    title: {
	        text: 'Seleccione',
	        size: 12,
	        h: 44,
	        bg: '#eee',
	        color: '#888'
	    },
	    fixedOn: api.frameName
	}, function(ret, err) {
	    callback && callback(ret,err);
	});
};

function isLanguage(){
	if($api.getStorage("language") == "zh-CN" || $api.getStorage("language") == "zh-cn"){
		return 0;
	}else if($api.getStorage("language") == "en-US" || $api.getStorage("language") == "en-us"){
		return 1;
	};
};

function noData(msg, imgurl) {
	$(".lists").append('<div class="null" id="nodata" style="position: absolute;top: 30%">' +
		'<img src="' + imgurl + '" alt="" class="nullImg"/>' +
		'<p class="nullMsg">' + msg + '</p>' +
		'</div>');
}

function closeNoData(){
	$("#nodata").remove();
	$("body").css("overflow","auto");
};


function checkMobile(Mobile){
	return true;
 // if(!(/^1[3|4|5|8|7|9|6][0-9]\d{8}$/.test(Mobile))){
 //     return false;
 // }else{
 //     return true;
 // }
};

function openNewPage(winurl,route,url,title,data){
	api.openWin({
		name: url+"win"+Math.random(),
		url: winurl,
    bgColor: "#fff",
		pageParam:{
			route:route,
			url:url,
			title:title,
			data:data
		}
	});
}
