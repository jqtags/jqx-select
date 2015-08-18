define({
	name : "jqtags.x.select.test",
	extend : "spamjs.view",
	modules : ["jqtags.select2"]
}).as(function() {
	
	return {
		src : [
		    "jqtags.x.select.test.html"
		],
		events : {
			"change jq-slider" : "dropdownChanged",
      "jq.init" : "initSelection",
      "jq.query" : "selectQuery"
		},
		_init_ : function(){
      _importStyle_("unidesk/select");
			_importStyle_("jqtags/jqx-select");
			var self = this;
			this.view("jqtags.x.select.test.html").done(function(){
				self.model({
					testvalue : ["amr","akb"],
					rangeValue : [3,6],
					input : "My def"
				});
			});
		},
		dropdownChanged : function(a,b,c){
			console.log("dropdownChanged",a,b,c);
		},
    initSelection : function(e,target,data){
      console.error("initSele", e.detail.value,target,data);
      e.detail.populate([{id: 'in', text: 'India'}]);
    },
    selectQuery : function(e){
      e.detail.setOptions([{id: 'gb', text: 'Great Britain'},
        {id: 'us', text: 'United States'},
        {id: 'in', text: 'India'},
        {id: 'ru', text: 'Russia'}]);
    },
		_remove_ : function(){
			
		}
	};
	
});