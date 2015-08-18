_tag_("jqtags.x.select",function(select){
	
	var jq = module("jQuery");
	
	return {
	    tagName: "jqx-select",
	    events: {
	    },
	    accessors: {
	        value: {
	            type: "string",
	            default : "",
	            onChange : "valueOnChange"
	        },
	        popup : {
	        	type : "boolean",
	        	default : true
	        },
          placeholder : {
            type : "string",
            default : "Select"
          },
          emptyString : {
            type : "string",
            default : "Select"
          }
	    },
	    attachedCallback : function () {
	    	var self = this;
        var tpl  = this.$.innerHTML;
        var source = [];
        jQuery(this.$).find("option").each(function(i,elem){
            source.push({
              value : elem.value,
              text : elem.text
            })
        });
	    	this.$.innerHTML = '<a href=# data-type=select data-title="'+ this.$.placeholder +'" >'+this.$.emptyString+'</a>';
	    	this.$a =jQuery(this.$).find("a");
          self.mySelectedOptions ={};
          self.selected = [];
          self.setValue(self.$.value);
          self.trigger("jq.init",{
            value : self.$.value,
            populate : function(selected){
              self.addOptions(selected);
              self.setValue(self.$.value);
            }
          });
          self.$a.editable({
            send : 'never',
            source : source,
            mode : (self.$.popup ? 'popup' : 'inline'),
            title:  self.$.title
          }).on("save",debounce(function(e,params){
            self.$.value = params.newValue;
            self.setValue(params.newValue);
            self.trigger("change");
            self.trigger("input");
          }));//.trigger("change");
	    },
	    detachedCallback : function(){
        this.$a.editable("destroy");
	    },
      addOptions : function(options){
          for(var i in options){
            this.mySelectedOptions[options[i].id] = options[i].text;
          }
      },
      setValue : function(newValue){
        if(newValue === undefined) return;
        var finalValues = [];
        var newValues = [(newValue+"").split(",")[0]];
        this.selected = [];
        for(var i in newValues){
          finalValues.push(this.mySelectedOptions[newValues[i]] || newValues[i]);
          this.selected.push({ id : newValues[i], text : this.mySelectedOptions[newValues[i]] || newValues[i]});
        }
        var finalValue = finalValues.join(",");
        this.$a.text(!is.Empty(finalValue) ? finalValue : this.$.emptyString);
        return this.selected;
      },
	    valueOnChange : function(e,oldValue,newValue){
        this.setValue(newValue);
	    }
	};
});