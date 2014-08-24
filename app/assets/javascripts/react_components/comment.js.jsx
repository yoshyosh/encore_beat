/** @jsx React.DOM */

var Comment = React.createClass({
  render: function () {
    var avatarPath = 'http://res.cloudinary.com/dhkz9zvs5/image/upload/c_fill,h_32,w_32/r_max/' + this.props.avatar;
    return (
      <div className="comment">
        <div className="comment-details-container">
          <img className="user-avatar-thumb" src={ avatarPath } />
          <p className="song-submitter-name bold">{ this.props.user }</p>
          <p className="song-comments-label grey">{ this.props.created_at }</p>
          <p>{ this.props.body }</p>
        </div>
      </div>
    )
  }
});