/** @jsx React.DOM */

var CommentBox = React.createClass({
  getInitialState: function () {
    return JSON.parse(this.props.presenter);
  },

  handleCommentSubmit: function (formData, action) {
    $.ajax({
      data: formData,
      url: action,
      type: "POST",
      dataType: "json",
      success: function (data) {
        this.setState({ comments: data });
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <CommentList user={ this.state.user } comments={ this.state.comments } />
        <CommentForm form={ this.state.form } onCommentSubmit={ this.handleCommentSubmit } submission_id={ JSON.parse(this.props.presenter).submission_id } />
      </div>
    );
  }
});