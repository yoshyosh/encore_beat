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
    var cx = React.addons.classSet;
    var arrowClasses = cx({
      'arrow-up': true,
      'clicked': this.state.clicked
    });

    var upvote = (<div className={ arrowClasses } onClick={ this.handleClick } />)

    return (
      <ReactCSSTransitionGroup transitionName="upvote">
        { upvote }
      </ReactCSSTransitionGroup>
    );
  }
});