/** @jsx React.DOM */

var CharacterCount = React.createClass({
  render: function() {
    var length = this.props.text.length;

    return (
      <span className="character-count">
        { length } / 2000 characters
      </span>
    );
  }
});