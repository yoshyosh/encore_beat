/** @jsx React.DOM */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Upvote = React.createClass({
  getInitialState: function() {
    return { clicked: false };
  },

  componentWillMount: function() {
    if (this.props.upvoted) {
      this.setState({clicked: true});
    }
  },

  handleClick: function() {
    this.setState({clicked: !this.state.clicked});
    var counter = $('.vote-count[data-count-id=' + this.props.song_id + ']')
    var currentCount = parseInt(counter.text())

    if (this.state.clicked) {
      // state has not yet updated, so we use the inverse. Deduct if state is "currently" clicked
      counter.text(currentCount - 1)
    }
    else {
      counter.text(currentCount + 1)
    }

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