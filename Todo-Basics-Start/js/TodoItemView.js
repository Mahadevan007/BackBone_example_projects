var TodoItemView = Backbone.View.extend({
  tagName: "li",

  initialize: function(options) {
    if (!options && options.model) {
      throw new Error("model is not specified");
    }

    this.model.on("change", this.render, this);
  },

  events: {
    "click #toggle": "onToggleClicked",
    "click #delete": "onClickDelete"
  },

  onClickDelete: function() {
    this.model.destroy();
  },

  onToggleClicked: function() {
    this.model.toggle();
    this.model.save();
    console.log(this.model.toJSON());
  },

  render: function() {
    this.$el.attr("id", this.model.id);

    this.$el.toggleClass("completed", this.model.get("completed"));

    var checked = this.model.get("completed") ? "checked" : "";

    this.$el.html(
      "<input id='toggle' type='checkbox'" +
        checked +
        " ></input>" +
        this.model.escape("title") +
        "<button id='delete'>Delete</button>"
    );

    return this;
  }
});
