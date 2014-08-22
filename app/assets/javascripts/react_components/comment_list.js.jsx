/** @jsx React.DOM */

var CommentList = React.createClass({
  render: function () {
    var user = this.props.user;
    var commentNodes = this.props.comments.map(function (comment) {
      return <Comment user={ user } body={ comment.body } created_at={ jQuery.timeago(comment.created_at) } key={ comment.id } />;
    });

    return (
      <div>
        { commentNodes }
      </div>
    );
  }
});