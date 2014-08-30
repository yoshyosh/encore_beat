/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var CommentList = React.createClass({
  render: function () {
    var self = this;

    var commentNodes = this.props.comments.map(function (comment) {
      var id = comment[0];
          body = comment[1];
          created = comment[2];
          username = comment[3];
          avatar = comment[4];
          timeago = jQuery.timeago(created);

      return <Comment commenter={ username } body={ body } created_at={ timeago } avatar={ avatar } current_user={ self.props.current_user } handleCommentDelete={ self.props.onCommentDelete } key={ id } />;
    });

    return (
      <ReactCSSTransitionGroup transitionName="comments">
        { commentNodes }
      </ReactCSSTransitionGroup>
    );
  }
});