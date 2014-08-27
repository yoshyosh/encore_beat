/** @jsx React.DOM */

var Comment = React.createClass({
  render: function () {
    var avatarPath = 'http://res.cloudinary.com/dhkz9zvs5/image/upload/c_fill,h_50,w_50/r_max/' + this.props.avatar;

    return (
      <div className="comment">
        <div className="comment-container">
          <img className="user-avatar-thumb" src={ avatarPath } />
          <div className="comment-details-content">
            <p className="song-submitter-name bold">{ this.props.user }</p>
            <p className="song-comments-label grey">{ this.props.created_at }</p>
            <p className="comment-content">{ this.props.body }</p>
          </div>
        </div>
      </div>
    )
  }
});