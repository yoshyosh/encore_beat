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
    if ($('#commentTextarea').val().length > 2000) {
      alert("Sorry, your comment must be less than 2000 characters.");
      return false;
    }

    // submit
    var formData = $(this.refs.form.getDOMNode()).serialize();
    this.props.onCommentSubmit( formData, this.props.form.action );

    // reset form
    this.refs.body.getDOMNode().value = "";

    // increment comment count
    var count = $('.comment-count')
    var countParts = count.text().split(" ")
    var newCount = parseInt(countParts[0]) + 1
    count.text(newCount + " Comments")
  },

  handleCharacterLimit: function() {
    $('textarea').css('background-color', '#ff0000')
  },

  handleTextInput: function(event) {
    this.setState({ text: event.target.value })
  },

  render: function() {
    var avatarPath = this.props.user.avatar.thumb.url;
    return (
      <div className="comment-input-container">
        <img className="user-avatar-thumb" src={ avatarPath } />
        <form ref="form" className="comment-form-container" action={ this.props.form.action } accept-charset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
          <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
          <p><input type="hidden" ref="submission_id" name="comment[submission_id]" value={ this.props.submission_id } /></p>
          <p><textarea onChange={ this.handleTextInput } className="comment-text-area" ref="body" name="comment[body]" placeholder="Have anything to add?" id="commentTextarea" /></p>
          <CharacterCount text={ this.state.text } handleCharacterLimit={ this.handleCharacterLimit } />
          <button id="submit-comment-button" className="primary-action-button" type="submit">Submit</button>
        </form>
      </div>
    );
  }
});