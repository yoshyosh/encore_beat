/** @jsx React.DOM */

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.comments.map(function (comment) {
      var id = comment[0];
          body = comment[1];
          created = comment[2];
          username = comment[3];
          avatar = comment[4];
          timeago = jQuery.timeago(created);

      return <Comment user={ username } body={ body } created_at={ timeago } avatar={ avatar } key={ id } />;
    });

    return (
      <div>
        { commentNodes }
      </div>
    );
  }
});