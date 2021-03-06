/** @jsx React.DOM */

var CommentForm = React.createClass({
  getInitialState: function() {
    return { text: '' };
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var body = this.refs.body.getDOMNode().value.trim();

    // validate
    if (!body) return false;
    if ($('#commentTextarea').val().length > 1000) {
      alert("Sorry, your comment must be less than 1000 characters.");
      return false;
    }

    // submit
    var formData = $(this.refs.form.getDOMNode()).serialize();
    this.props.onCommentSubmit( formData, this.props.form.action );

    // increment comment count
    var count = $('.comment-count')
    var countParts = count.text().split(" ")
    var newCount = parseInt(countParts[0]) + 1
    count.text(newCount + " Comments")

    // reset form
    this.refs.body.getDOMNode().value = "";
    this.setState({ text: '' });

    // scroll to comment
    $('html,body').animate({
       scrollTop: $('.comment').offset().top
    });
  },

  handleCharacterLimit: function() {
    $('textarea').css('background-color', '#ff0000')
  },

  handleTextInput: function(event) {
    this.setState({ text: event.target.value })
  },

  render: function() {
    if (this.props.user.avatar.url) {
      var avatarPath = this.props.user.avatar.thumb.url;
    }
    else {
      var avatarPath = 'http://res.cloudinary.com/dhkz9zvs5/image/upload/c_fill,h_50,w_50/r_max/defaultAvatar_a8kvhz';
    }
    
    return (
      <div className="comment-input-container">
        <img className="user-avatar-thumb" src={ avatarPath } />
        <p className="posting-as">Posting as: { this.props.user.username }</p>
        <form ref="form" className="comment-form-container" action={ this.props.form.action } accept-charset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
          <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
          <p><input type="hidden" ref="submission_id" name="comment[submission_id]" value={ this.props.submission_id } /></p>
          <p><textarea onChange={ this.handleTextInput } className="comment-text-area" ref="body" name="comment[body]" placeholder="Like the song? Leave a comment!" id="commentTextarea" /></p>
          <CharacterCount text={ this.state.text } handleCharacterLimit={ this.handleCharacterLimit } />
          <button id="submit-comment-button" className="primary-action-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
});