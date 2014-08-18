/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Upvote = React.createClass({
  getInitialState: function() {
    return {initiallyUpvoted: this.props.upvoted, clicked: false};
  },

  componentWillMount: function() {
    if (this.state.initiallyUpvoted) {
      this.setState({clicked: true});
    }
  },

  handleClick: function() {
    this.setState({clicked: !this.state.clicked});
    console.log(!this.state.clicked)
    $.ajax({
      data: {submission_id: this.props.song_id, upvoted: !this.state.clicked },
      url: '/upvotes',
      type: 'post',
      dataType: 'json'
    });
  },

  render: function() {
    if (this.state.clicked) {
      var upvote = (<div className="arrow-up clicked" onClick={ this.handleClick } />)
    }
    else {
      var upvote = (<div className="arrow-up" onClick={ this.handleClick } />)
    }

    return (
      <ReactCSSTransitionGroup transitionName="upvote">
        { upvote }
      </ReactCSSTransitionGroup>
    );
  }
});