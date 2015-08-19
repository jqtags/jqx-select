_tag_("jqtags.x.select", function (select) {

  var jq = module("jQuery");

  return {
    tagName: "jqx-select",
    events: {
      "change .editableform" : "internChanges"
    },
    accessors: {
      value: {
        type: "string",
        default: "",
        onChange: "valueOnChange"
      },
      popup: {
        type: "boolean",
        default: true
      },
      placeholder: {
        type: "string",
        default: "Select"
      },
      emptyString: {
        type: "string",
        default: "Select"
      }
    },
    attachedCallback: function () {
      var self = this;
      var tpl = this.$.innerHTML;

      self.source = [];

      jQuery(this.$).find("option").each(function (i, elem) {
        self.source.push({
          value: elem.value,
          text: elem.text
        })
      });

      this.$.innerHTML = '<a href=# data-type=select data-title="' + this.$.placeholder + '" >' + this.$.emptyString + '</a>';
      this.$a = jQuery(this.$).find("a");

      self.$a.editable({
        send: 'never',
        source: self.source,
        mode: (self.$.popup ? 'popup' : 'inline'),
        title: self.$.title
      }).on("save", debounce(function (e, params) {
        self.$.value = params.newValue;
        self.setValue(params.newValue);
        self.trigger("change");
        self.trigger("input");
      }));
    },
    detachedCallback: function () {
      this.$a.editable("destroy");
    },
    internChanges : function(e){
      return preventPropagation(e);
    },
    setValue: function (newValue) {
      this.$a.editable("option","value", newValue);
      if (newValue === undefined) return;
      var finalValues = [];
      var newValues = [(newValue + "").split(",")[0]];
      for (var i in newValues) {
        finalValues.push(this.source.filter(function(index,option){
            return index.value === newValues[i];
        }).map(function(option){
            return option.text;
        }));
      }
      var finalValue = finalValues.join(",");
      this.$a.text(!is.Empty(finalValue) ? finalValue : this.$.emptyString);
    },
    valueOnChange: function (e, oldValue, newValue) {
      this.setValue(newValue);
    }
  };
});