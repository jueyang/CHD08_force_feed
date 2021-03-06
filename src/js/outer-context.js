(function(w){
	var OuterContext = {
		
		/*
		 * Init stuff
		 * @params void
		 * @returns void
		 */
		init:function(){
			w.FF.ext = this.isExt();
			this.events();
		},
		isExt:function(){
			if (chrome && chrome.runtime.onMessage){
				return true;
			}
			return false;
		},
		events:function(){
			if (w.FF.ext){
				chrome.runtime.onMessage.addListener(this.button.bind(this));
			} else {
				setTimeout(this.button.bind(this),500);
			}
		},
		button:function(request, sender, sendResponse){
			if (request && request.article){
				$('body').trigger('article-data-ready',[request.article]);
				return;
			}
			var event = window.FF.visible ? 'ex-hide' : 'ex-show';
			$('body').trigger(event);
		}
	};
	
	OuterContext.init();
	
})(window);