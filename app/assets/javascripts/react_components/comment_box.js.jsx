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

  handleCommentDelete: function (commentId) {
    $.ajax({
      data: {comment_id: commentId},
      url: '/comments/' + commentId,
      type: "DELETE",
      dataType: "json",
      success: function (data) {
        this.setState({ comments: data });
      }.bind(this)
    });
  },

  render: function () {
    if (this.state.user) {
      var commentBox = (<div>
        <CommentForm form={ this.state.form } onCommentSubmit={ this.handleCommentSubmit } submission_id={ this.state.submission_id } user={ this.state.user }/>
        <CommentList comments={ this.state.comments } current_user={ this.state.user } onCommentDelete={ this.handleCommentDelete } />
      </div>)
    }
    else {
      var commentBox = (<div>
        <CommentList comments={ this.state.comments } />
      </div>)
    }

    return (
      <div>
        { commentBox }
      </div>
    );
  }
});