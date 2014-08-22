/** @jsx React.DOM */

var Comment = React.createClass({
  render: function () {
    debugger
    return (
      <div className="comment">
        <div className="comment-details-container">
          <p className="song-submitter-name bold">{ this.props.user.username }</p>
          <p className="song-comments-label grey">{ this.props.created_at }</p>
          <p>{ this.props.body }</p>
        </div>
      </div>
    )
  }
});