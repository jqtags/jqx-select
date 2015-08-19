define({
  name: "jqtags.x.select.test",
  extend: "spamjs.view",
  modules: ["jqtags.x.select"]
}).as(function () {

  return {
    src: [
      "jqtags.x.select.test.html"
    ],
    events: {
      "change .myselectbox": "dropdownChanged"
    },
    _init_: function () {
      _importStyle_("jqtags/jqx-select");
      var self = this;
      this.view("jqtags.x.select.test.html").done(function () {
        self.model({
          input: "a"
        });
      });
    },
    dropdownChanged: function (a, b, c) {
      console.log("dropdownChanged", a, b, c);
    },
    _remove_: function () {

    }
  };

});