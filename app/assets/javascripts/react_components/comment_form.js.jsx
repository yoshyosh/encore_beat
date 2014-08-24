/** @jsx React.DOM */

var CommentForm = React.createClass({
  handleSubmit: function (event) {
    event.preventDefault();
    var body = this.refs.body.getDOMNode().value.trim();

    // validate
    if (!body) return false;

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

  render: function () {
    return (
      <form ref="form" className="comment-form-container" action={ this.props.form.action } accept-charset="UTF-8" method="post" onSubmit={ this.handleSubmit }>
        <p><input type="hidden" name={ this.props.form.csrf_param } value={ this.props.form.csrf_token } /></p>
        <p><input type="hidden" ref="submission_id" name="comment[submission_id]" value={ this.props.submission_id } /></p>
        <p><textarea className="comment-text-area" ref="body" name="comment[body]" placeholder="Have anything to add?" /></p>
        <p><button id="submit-song-button" className="primary-action-button" type="submit">Submit</button></p>
      </form>
    );
  }
});