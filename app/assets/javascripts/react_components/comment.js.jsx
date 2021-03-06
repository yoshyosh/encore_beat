/** @jsx React.DOM */

var Comment = React.createClass({
  handleDelete: function() {
    var deleteComment = confirm("Really delete this comment? This is irreversible.")

    if (deleteComment){
      var commentId = this.props.key
      this.props.handleCommentDelete(commentId);
    }
  },

  render: function () {
    var userPath = '/user/' + this.props.commenter;

    if (this.props.avatar) {
      var avatarPath = 'http://res.cloudinary.com/dhkz9zvs5/image/upload/c_fill,h_50,w_50/r_max/' + this.props.avatar;
    }
    else {
      var avatarPath = 'http://res.cloudinary.com/dhkz9zvs5/image/upload/c_fill,h_50,w_50/r_max/defaultAvatar_a8kvhz.png';
    }

    if (this.props.current_user && (this.props.current_user.admin || this.props.current_user.username === this.props.commenter)) {
      var deleteComment = (<span className="admin-delete-comment" onClick={ this.handleDelete }>DELETE</span>);
    }
    else {
      var deleteComment = (<span/>);
    }

    return (
      <div className="comment">
        <div className="comment-container">
          <img className="user-avatar-thumb" src={ avatarPath } />
          <div className="comment-details-content">
            <p className="song-submitter-name bold">
              <a href={ userPath }>{ this.props.commenter }</a>
            </p>
            <p className="song-comments-label grey">{ this.props.created_at }</p>
            { deleteComment }
            <p className="comment-content">{ this.props.body }</p>
          </div>
        </div>
      </div>
    )
  }
});