(function(window){
  var selectAction={};
  var _callback;

   // 打开拍照
	function pai_zhao(sourceType, txt){
		api.getPicture({
			sourceType : sourceType,
			encodingType : "jpg",
			destinationType : "url",
			mediaValue : "pic",
			quality : 50,
			saveToPhotoAlbum : true
		}, function(ret, err) {

			if (ret && ret.data) {
			   _callback&&_callback(ret.data);
			} else {
			    api.toast({
				    msg : txt
			    });
			}
		});
	}
  selectAction.shang_tu = function(callback, txts){
        _callback = callback;
        api.actionSheet({
        title: txts.title,
        buttons: [txts.photograph, txts.album]
		}, function(ret, err) {
			var index = ret.buttonIndex;
			if(index==1){pai_zhao('camera', txts.noPhoto);}
			else if(index==2){pai_zhao('library', txts.noPhoto);}
			else{return}
		});
  }

  window.selectAction = selectAction;
})(window)
